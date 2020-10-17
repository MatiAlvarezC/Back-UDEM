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
            apellido_materno,
            celular,
            correo,
            talla_camisa,
            talla_short,
            puesto,
            isActive,
            isAdmin
        } = req.body

        password = await nomina.slice(0, 4);
        password = await bcrypt.hash(password, 10)

        let x = 1;
        let name = nombres.slice(0, 1)
        let counter = 0

        do {
            try {
                username = ((name.concat(apellido_paterno)).concat((x.toString()).padStart(2, 0))).toLowerCase()

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
                if (username === e.errors[0].value) {
                    x++
                } else if (nomina === e.errors[0].value) {
                    counter++
                    return res.send("nomina duplicada", 400)
                } else if (correo === e.errors[0].value) {
                    counter++
                    return res.send("correo duplicado", 400)
                } else {
                    counter++
                    return res.sendStatus(400)
                }
            }
        } while (counter < 1)

    } catch (e) {
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
        const user = Usuario.findByPk(req.params.id)

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
            isAdmin
        } = req.body

        const user = Usuario.findByPk(req.params.id)

        if (!user) {
            return res.sendStatus(404)
        }

        user.update({
            nomina,
            nombres,
            apellido_paterno,
            apellido_materno,
            celular,
            correo,
            talla_camisa,
            talla_short,
            puesto,
            isAdmin
        })

        return res.sendStatus(201)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const updateStatus = (req, res) => {
    try {
        const isActive = req.body

        const user = Usuario.findByPk(req.params.id)

        if (!user) {
            return res.sendStatus(404)
        }

        user.update({
            isActive
        })

        return res.sendStatus(201)

    } catch (e) {
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
    updateStatus
}
