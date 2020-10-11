const router = require('express').Router();
const DeportesController = require('../../Controllers/api/deportes');
const { check, validationResult } = require('express-validator');
const { Deporte } = require('../../database/database');


router.get('/', DeportesController.get_all);

router.get('/:deporteId', DeportesController.get_by_id);

router.post('/', [
    check('nombre_deporte').not().isEmpty().withMessage('El campo nombre es obligatorio'),
], DeportesController.create);

router.put('/:deporteId', DeportesController.update);

router.delete('/:deporteId', DeportesController.destroy);

module.exports = router;