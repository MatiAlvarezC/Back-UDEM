const express = require('express');
const Championchip_C = require('../Controllers/Championship_Controller')
const router = express.Router();


router.post('/register', Championchip_C.create)
router.patch('/update/:id', Championchip_C.update)
router.get('/getAll', Championchip_C.getAll)
/** Obtiene la cantidad de paginas, segun la cantidad de campeonatos**/
router.get('/getMaxPages', Championchip_C.getMaxPages)
//** Obtener segun la pagina */
router.get('/:page/:order/:by', Championchip_C.getByPage)
/** http://localhost:3001/championship/1/asc/isactive */
/** http://localhost:3001/championship/1/asc/isnotactive */
/** asc o desc por fecha */
 
module.exports = router
