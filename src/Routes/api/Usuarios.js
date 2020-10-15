const router = require('express').Router();
const UsuariosControllers = require('../../Controllers/api/Usuarios');




router.get('/', UsuariosControllers.get_all);

router.get('/:usuarioId', UsuariosControllers.get_by_id);

router.get('/getUserLogin/:usuarioId', UsuariosControllers.get_user_login);


router.post('/', UsuariosControllers.create);

router.put('/:usuarioId', UsuariosControllers.update);

router.delete('/:usuarioId', UsuariosControllers.destroy);



module.exports = router;
