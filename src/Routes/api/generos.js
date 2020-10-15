const router = require('express').Router();
const GenerosController = require('../../Controllers/api/generos');
const { check } = require('express-validator');



router.get('/', GenerosController.get_all);

router.get('/:generoId', GenerosController.get_by_id);

router.post('/', GenerosController.create);

router.put('/:generoId', GenerosController.update);

router.delete('/:generoId', GenerosController.destroy);

module.exports = router;