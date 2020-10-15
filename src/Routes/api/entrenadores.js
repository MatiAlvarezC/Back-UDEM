const router = require('express').Router();
const EntrenadoresController = require('../../Controllers/api/entrenadores');
const { check } = require('express-validator');



router.get('/', EntrenadoresController.get_all);

router.get('/:entrenadorId', EntrenadoresController.get_by_id);

router.post('/', EntrenadoresController.create);

router.put('/:entrenadorId', EntrenadoresController.update);

router.delete('/:entrenadorId', EntrenadoresController.destroy);

module.exports = router;