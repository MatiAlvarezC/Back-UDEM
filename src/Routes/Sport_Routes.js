const express = require('express');
const Sport_C = require('../Controllers/Sport-Controller')
const router = express.Router();
const { isAuth } = require('../Middlewares/Auth')

router.post('/register', Sport_C.create)
router.patch('/update', Sport_C.update)
router.get('/getAll', Sport_C.getAll)

/**
 *  page: numero de pagina actual.
 *  order: tipo de orden, ASC o DESC.
 *  by: por columna, EJ: nombre,isActive,equipos(cantidad),deportistas(cantidad)
 */
router.get('/:page/:order/:by', Sport_C.getByPage)

router.get('/:id', Sport_C.getByID)

module.exports = router
