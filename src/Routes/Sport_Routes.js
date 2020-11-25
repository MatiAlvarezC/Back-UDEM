const express = require('express');
const Sport_C = require('../Controllers/Sport_Controller')
const Directory = require('../Middlewares/Directory')
const router = express.Router();
const isAuth = require("../Middlewares/Auth")
const isAdmin = require("../Middlewares/Admin")

/**-- Subida de archivos --**/
const path = require('path')
/** gestiona el formato del fichero **/

const multer = require('multer')
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.FILEPATH) /** ruta donde se guardaran los ficheros **/
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage});

router.post('/upload',isAdmin, Directory, upload.single('file'), (req, res) => {
    console.log(`storage location is ${req.hostname}/${req.file.path}`)
    return res.send(req.file)
})
/**-- FIN Subida de archivos --**/


router.post('/register',isAdmin, Sport_C.create)
router.patch('/update/:id',isAdmin,Sport_C.update)
router.get('/getAll',isAdmin,Sport_C.getAll)

/** Obtiene la cantidad de paginas, segun la cantidad de deportes, y por la cantidad de deportes por paginas**/
router.get('/getMaxPages',isAuth,Sport_C.getMaxPages)

/** Obtiene los entrenadores por equipo de manera paginada **/
router.get('/getCoachesByPage/:id/:page',isAdmin,Sport_C.getCoachesByPage)
router.get('/getMaxPagesForCoaches/:id',isAdmin, Sport_C.getMaxPagesForCoaches)

/**
 *  page: numero de pagina actual.
 *  order: tipo de orden, ASC o DESC.
 *  by: por columna, EJ: nombre,isActive,equipos(cantidad),deportistas(cantidad)
 */
router.get('/:page/:order/:by',isAdmin, Sport_C.getByPage)

router.get('/:id',isAdmin, Sport_C.getByID)
router.get('/getTeamAssigned/:id',isAuth, Sport_C.getTeamAssigned)


module.exports = router
