const Genero = require("../../models/Genero")
const Equipo = require("../../models/Equipo")
const { validationResult } = require('express-validator');

exports.get_all = async (req, res) => {
    const generos = await Genero.findAll({include: Equipo});
    res.json(generos);
};

exports.get_by_id = async (req, res) => {
    const genero = await Genero.findByPk(req.params.generoId, {include: Equipo});
    res.json(genero);
};

exports.create = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors });
    }
    const genero = await Genero.create(req.body);
    res.json(genero);
};

exports.update = async (req, res) => {
    await Genero.update(req.body, {
        where: { id_genero: req.params.generoId}
    });
    const genero = await Genero.findByPk(req.params.generoId);
    res.json({ success: "modificado correctamente", genero });
};

exports.destroy = async (req, res) =>{
    await Genero.destroy({
        where: { id_genero: req.params.generoId}
    });
    res.json({ succes: "Se ha eliminado el genero" });;
};
