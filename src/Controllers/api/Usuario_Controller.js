const Usuario = require("../../models/Usuario")
const Equipo = require("../../models/Equipo")
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt')

/*const login = async (req, res) => {
    try {
        const {}
    }
}*/

exports.get_all = async (req, res) => {
    const usuarios = await Usuario.findAll({include: Equipo});
    res.json(usuarios);
};

exports.get_by_id = async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.usuarioId, {include: Equipo});
    res.json(usuario);
};

const createUser = async (req, res) => {
    //const errors = validationResult(req);

    try {
        let password, username
        const {
            nomina,
            nombres,
            apellido_paterno,
            apellido_materno,
            celular,
            correo,
            talla_camisa,
            talla_short,
            puesto,
            isActive,
            isAdmin
        } = req.body

        let x = 1;
        let name = nombres.slice(0, 1)
        let counter = 0

        do {
            try {
                username = (name.concat(apellido_paterno)).concat((x.toString()).padStart(2, 0))

                password = await nomina.slice(0, 4);
                password = await bcrypt.hash(password, 10)

                await Usuario.create({
                    nomina,
                    nombres,
                    apellido_paterno,
                    apellido_materno,
                    celular,
                    correo,
                    username,
                    password,
                    talla_camisa,
                    talla_short,
                    puesto,
                    isActive,
                    isAdmin
                })

                counter++
                return res.sendStatus(200)
            } catch (e) {
                console.log(e.errors[0].value)
                if(username === e.errors[0].value) {
                    x++
                }
                else {

                    counter++
                }
            }
        } while (counter < 1)

    } catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
}

exports.update = async (req, res) => {
    await Usuario.update(req.body, {
        where: {id_usuario: req.params.usuarioId}
    });
    const usuario = await Usuario.findByPk(req.params.usuarioId);
    res.json({success: "modificado correctamente", usuario});
};

exports.get_user_login = async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.usuarioId, {
        attributes: ['nombres', 'apellido_paterno', 'apellido_materno', 'isAdmin', 'isActive']
    });
    return res.send(usuario)
}

module.exports = {
    createUser
}
