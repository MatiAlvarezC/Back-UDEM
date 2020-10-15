const {route} = require('./Status-R');

const router = require('express').Router();

const apiDeportesRouter = require('./api/deportes');
const apiEquiposRouter = require('./api/equipos');
const apiEntrenadoresRouter = require('./api/entrenadores');
const apiGenerosRouter = require('./api/generos');

router.use('/deportes', apiDeportesRouter);
router.use('/equipos', apiEquiposRouter);
router.use('/entrenadores', apiEntrenadoresRouter);
router.use('/generos', apiGenerosRouter);

module.exports = router;
