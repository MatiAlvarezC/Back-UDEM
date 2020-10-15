const router = require('express').Router();
const EquiposController = require('../../Controllers/api/equipos');
const { check } = require('express-validator');



router.get('/', EquiposController.get_all);

router.get('/:equipoId', EquiposController.get_by_id);

router.post('/', EquiposController.create);

router.put('/:equipoId', EquiposController.update);

router.delete('/:equipoId', EquiposController.destroy);

module.exports = router;