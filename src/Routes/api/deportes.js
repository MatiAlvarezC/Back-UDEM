const router = require('express').Router();

const { Deporte } = require('../../database/database');

router.get('/', async (req, res) => {
    const deportes = await Deporte.findAll();
    res.json(deportes);
});

router.get('/:deporteId', async (req, res) => {
    const deporte = await Deporte.findByPk(req.params.deporteId);
    res.json(deporte);
});

router.post('/', async (req, res) => {
    const deporte = await Deporte.create(req.body);
    res.json(deporte);
});

router.put('/:deporteId', async (req, res) => {
    await Deporte.update(req.body, {
        where: { id_deporte: req.params.deporteId}
    });
    const deporte = await Deporte.findByPk(req.params.deporteId);
    res.json({ success: "modificado correctamente", deporte });
});

router.delete('/:deporteId', async (req, res) =>{
    await Deporte.destroy({
        where: { id_deporte: req.params.deporteId}
    });
    res.json({ succes: "Se ha eliminado el deporte" });;
});

module.exports = router;