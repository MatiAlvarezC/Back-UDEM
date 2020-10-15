const { Entrenador, Equipo } = require('../../database/database');
const { validationResult } = require('express-validator');

exports.get_all = async (req, res) => {
    const entrenadores = await Entrenador.findAll({include: Equipo});
    res.json(entrenadores);
};

exports.get_by_id = async (req, res) => {
    const entrenador = await Entrenador.findByPk(req.params.entrenadorId, {include: Equipo});
    res.json(entrenador);
};

exports.create = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors });
    }
    const entrenador = await Entrenador.create(req.body);
    res.json(entrenador);
};

exports.update = async (req, res) => {
    await Entrenador.update(req.body, {
        where: { id_entrenador: req.params.entrenadorId}
    });
    const entrenador = await Entrenador.findByPk(req.params.entrenadorId);
    res.json({ success: "modificado correctamente", entrenador });
};

exports.destroy = async (req, res) =>{
    await Entrenador.destroy({
        where: { id_entrenador: req.params.entrenadorId}
    });
    res.json({ succes: "Se ha eliminado el entrenador" });;
};