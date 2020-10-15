const {route} = require('./Status-R');

const router = require('express').Router();

const apiDeportesRouter = require('./api/deportes');
const apiEquiposRouter = require('./api/equipos');
const apiEntrenadoresRouter = require('./api/Usuarios');
const apiGenerosRouter = require('./api/generos');

router.use('/deportes', apiDeportesRouter);
router.use('/equipos', apiEquiposRouter);
router.use('/usuarios', apiEntrenadoresRouter);
router.use('/generos', apiGenerosRouter);

module.exports = router;
