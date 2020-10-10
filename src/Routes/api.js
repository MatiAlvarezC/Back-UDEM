const { route } = require('./Status-R');

const router = require('express').Router();

const apiDeportesRouter = require('./api/deportes');

router.use('/deportes', apiDeportesRouter);

module.exports = router;