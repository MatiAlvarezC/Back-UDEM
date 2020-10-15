const { Equipo, Genero, Deporte, Entrenador } = require('../../database/database');
const { validationResult } = require('express-validator');

exports.get_all = async (req, res) => {
    const equipos = await Equipo.findAll({ include: [
        {model: Deporte}, 
        {model: Entrenador}, 
        {model: Genero}
    ]});
    res.json(equipos);
};

exports.get_by_id = async (req, res) => {
    const equipo = await Equipo.findByPk(req.params.equipoId, { include: [
        {model: Deporte}, 
        {model: Entrenador}, 
        {model: Genero}
    ]});
    res.json(equipo);
};

exports.create = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors });
    }
    const equipo = await Equipo.create(req.body);
    res.json(equipo);
};

exports.update = async (req, res) => {
    await Equipo.update(req.body, {
        where: { id_equipo: req.params.equipoId}
    });
    const equipo = await Equipo.findByPk(req.params.equipoId, { include: [
        {model: Deporte}, 
        {model: Entrenador}, 
        {model: Genero}]});
    res.json({ success: "modificado correctamente", equipo });
};

exports.destroy = async (req, res) =>{
    await Equipo.destroy({
        where: { id_equipo: req.params.equipoId}
    });
    res.json({ succes: "Se ha eliminado el equipo" });;
};