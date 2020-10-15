const { Usuario, Equipo } = require('../../database/database');
const { validationResult } = require('express-validator');

exports.get_all = async (req, res) => {
    const usuarios = await Usuario.findAll({include: Equipo});
    res.json(usuarios);
};

exports.get_by_id = async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.usuarioId, {include: Equipo});
    res.json(usuario);
};

exports.create = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors });
    }
    const usuario = await Usuario.create(req.body);
    res.json(usuario);
};

exports.update = async (req, res) => {
    await Usuario.update(req.body, {
        where: { id_usuario: req.params.usuarioId}
    });
    const usuario = await Usuario.findByPk(req.params.usuarioId);
    res.json({ success: "modificado correctamente", usuario });
};

exports.destroy = async (req, res) =>{
    await Usuario.destroy({
        where: { id_usuario: req.params.usuarioId}
    });
    res.json({ succes: "Se ha eliminado el usuario" });
};



