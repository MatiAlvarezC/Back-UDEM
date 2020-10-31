const {Op} = require('sequelize')
const User = require("../Models/User")
const Team = require("../Models/Team")
const TeamUser = require("../Models/Team_User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body

        const user = await User.findOne({where: {username: username}, attributes: {include: ['password']}})

        if (!user) {
            return res.sendStatus(401)
        }

        if (user.failedLoginAttempts >= 5 && ((validator.toDate(Date()) - user.failedLoginTime) / 60000) <= 30) {
            return res.status(401).send("Intento de sesión bloqueado")
        }

        const pass = await bcrypt.compare(password, user.password)

        if (!pass) {
            await user.update({failedLoginAttempts: (user.failedLoginAttempts + 1), failedLoginTime: Date()})

            return res.sendStatus(401)
        }

        await user.update({failedLoginAttempts: null, failedLoginTime: null})

        const payload = {
            sub: user.username,
            name: user.name,
            isAdmin: user.isAdmin
        }

        /*const expiresIn = 600*/ /** Se usará en producción, es para establecer tiempo de expiración de la sesión **/

        return res.send(jwt.sign(payload, process.env.SECRET))

    } catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
}

const create = async (req, res) => {
    try {
        let hash, username
        const {
            payrollNumber,
            name,
            paternalLastName,
            email,
        } = req.body

        hash = await payrollNumber.slice(0, 4);
        hash = await bcrypt.hash(hash, 10)

        let x = 1;
        let names = name.slice(0, 1)
        let counter = 0

        do {
            username = ((names.concat(paternalLastName)).concat((x.toString()).padStart(2, 0))).toLowerCase()
            /**
             * Este conjunto de funciones se encarga de generar el username compuesto de la primera silaba del primer
             * nombre, el apellido paterno completo y un numero que parte desde el "01".
             */

            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        {username},
                        {payrollNumber},
                        (email !== null ? {email} : {})
                    ]
                }
            })

            if (user) {
                if (username === user.username) {
                    x++
                } else if (email === user.email) {
                    return res.status(400).send("Direccion de Correo Duplicada")
                } else if (payrollNumber === user.payrollNumber) {
                    return res.status(400).send("Nomina Duplicada")
                }
            } else {
                counter++
            }
        } while (counter === 0)

        await User.create({
            username,
            password: hash,
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
        const Users = await User.findAll({
            include: {
                model: Team
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
        const user = await User.findByPk(req.params.id)

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
        const {email} = req.body

        const user = await User.findByPk(req.params.id)

        if (!user) {
            return res.sendStatus(404)
        }

        if (email !== undefined) {
            const user2 = await User.findOne({
                where: {
                    email
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

const assignToTeam = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        const team = await Team.findByPk(req.body.equipo_id)
        user.addEquipo(team)
        return res.sendStatus(200)
    } catch (e) {
        return res.sendStatus(500)
    }
}

const getAssignedTeamsIds = async (req, res) => {
    try {
        const teamIds = await TeamUser.findAll({
            where: {
                userPayrollNumber: req.params.id
            },
            attributes: [
                'teamId'
            ]
        });
        return res.send(teamIds)
    } catch (e) {
        return res.sendStatus(500)
    }
}

module.exports = {
    login,
    create,
    getAll,
    getById,
    update,
    assignToTeam,
    getAssignedTeamsIds
}
