const {Op} = require('sequelize')
const Usuario = require("../models/Usuario")
const Equipo = require("../models/Equipo")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body

        const User = await Usuario.findOne({where: {username: username}, attributes: {include: ['password']}})

        if (!User) {
            return res.sendStatus(401)
        }

        const pass = await bcrypt.compare(password, User.password)

        if (!pass) {
            return res.sendStatus(401)
        }

        const payload = {
            sub: User.username,
            name: User.nombres
        }

        /*const expiresIn = 600*/ /** Se usará en producción, es para establecer tiempo de expiración de la sesión **/

        return res.send(jwt.sign(payload, process.env.SECRET))

    } catch (e) {
        return res.sendStatus(500)
    }
}

const create = async (req, res) => {
    try {
        let password, username
        const {
            nomina,
            nombres,
            apellido_paterno,
            correo,
        } = req.body

        password = await nomina.slice(0, 4);
        password = await bcrypt.hash(password, 10)

        let x = 1;
        let name = nombres.slice(0, 1)
        let counter = 0

        do {
            username = ((name.concat(apellido_paterno)).concat((x.toString()).padStart(2, 0))).toLowerCase()
            /**
             * Este conjunto de funciones se encarga de generar el username compuesto de la primera silaba del primer
             * nombre, el apellido paterno completo y un numero que parte desde el "01".
             */

            const user = await Usuario.findOne({
                where: {
                    [Op.or]: [
                        {username},
                        {nomina},
                        (correo !== null ? {correo} : {})
                    ]
                }
            })

            if (user) {
                if (username === user.username) {
                    x++
                } else if (correo === user.correo) {
                    return res.status(400).send("Direccion de Correo Duplicada")
                } else if (nomina === user.nomina) {
                    return res.status(400).send("Nomina Duplicada")
                }
            } else {
                counter++
            }
        } while (counter === 0)

        await Usuario.create({
            username,
            password,
            ...req.body
        })

        return res.sendStatus(200)
    } catch
        (e) {
        return res.sendStatus(500)
    }
}

const getAll = async (req, res) => {
    try {
        const Users = await Usuario.findAll({
            include: {
                model: Equipo
            }
        })

        if (Users.length === 0) {
            return res.sendStatus(404)
        }

        return res.send(Users)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const getById = async (req, res) => {
    try {
        const user = await Usuario.findByPk(req.params.id)

        if (!user) {
            return res.sendStatus(404)
        }

        res.send(user)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const update = async (req, res) => {
    try {
        const {correo} = req.body

        const user = await Usuario.findByPk(req.params.id)

        if (!user) {
            return res.sendStatus(404)
        }

        if (correo !== undefined) {
            const user2 = await Usuario.findOne({
                where: {
                    correo
                }
            })

            if (user2) {
                return res.status(400).send("Direccion de Correo Duplicada")
            }
        }

        await user.update({
            ...req.body
        })

        return res.sendStatus(201)

    } catch
        (e) {
        return res.sendStatus(500)
    }
}

exports.get_user_login = async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.usuarioId, {
        attributes: ['nombres', 'apellido_paterno', 'apellido_materno', 'isAdmin', 'isActive']
    });
    return res.send(usuario)
}

module.exports = {
    login,
    create,
    getAll,
    getById,
    update,
}
