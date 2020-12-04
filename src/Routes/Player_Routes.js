const express = require('express')
const router = express.Router()
const Player_C = require('../Controllers/Player_Controller')
const isAuth = require("../Middlewares/Auth")
const isAdmin = require("../Middlewares/Admin")
const Directory = require("../Middlewares/Directory")


/**-- Subida de archivos --**/
const path = require('path')
/** gestiona el formato del fichero **/

const multer = require('multer')
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.FILEPDFPATH) /** ruta donde se guardaran los ficheros **/
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











router.post('/register',isAdmin,Player_C.create)
router.get('/getAll',isAdmin,Player_C.getAll)
router.get('/getMaxPages',isAuth,Player_C.getMaxPages)
router.get('/:id',isAuth,Player_C.getById)

router.patch('/update/:id',isAdmin,Player_C.update)
router.post('/assignToTeam/:id',isAdmin,Player_C.assignToTeam)
router.patch('/unassignToTeam/:id',Player_C.unassignToTeam)

router.get('/getTeams/:id',isAuth,Player_C.getTeamsByPlayer)

router.get('/:page/:order/:by',isAuth,Player_C.getByPage)

router.post('/assignToChampionship/:id',Player_C.assignToChampionship)
router.get('/getAssignedChampionship/:id',Player_C.getAssignedChampionship)

module.exports = router
