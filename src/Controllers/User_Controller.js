const {Op} = require('sequelize')
const User = require("../Models/User")
const Team = require("../Models/Team")
const TeamUser = require("../Models/Team_User")
const Sport = require("../Models/Sport")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body

        const user = await User.findOne({
            where: {username: username},
            attributes: {include: ['password', 'failedLoginAttempts', 'failedLoginTime']}
        })

        if (!user) {
            return res.status(401).send("Datos Incorrectos")
        }

        if (user.failedLoginAttempts >= 5 && ((validator.toDate(Date()) - user.failedLoginTime) / 60000) <= 30) {
            return res.status(401).send("Intento de sesión bloqueado")
        }

        const pass = await bcrypt.compare(password, user.password)

        if (!pass) {
            await user.update({failedLoginAttempts: user.failedLoginAttempts + 1, failedLoginTime: Date()})

            return res.status(401).send("Datos Incorrectos")
        }

        await user.update({failedLoginAttempts: 0, failedLoginTime: null})

        const payload = {
            sub: user.username,
            id: user.payrollNumber,
            name: user.name,
            isAdmin: user.isAdmin
        }

        /*const expiresIn = 600*/ /** Se usará en producción, es para establecer tiempo de expiración de la sesión **/

        return res.send(jwt.sign(payload, process.env.SECRET))

    } catch (e) {
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

        hash = await (payrollNumber.toString()).slice(0, 4);
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
                        (email !== null ? {email} : null)
                    ]
                }
            })

            if (user) {
                if (username === user.username) {
                    x++
                } else if (email === user.email) {
                    return res.status(400).send("Direccion de Correo Duplicada")
                } else if (payrollNumber === (user.payrollNumber).toString()) {
                    return res.status(400).send("Nomina Duplicada")
                }
            } else {
                counter++
            }
        } while (counter === 0)

        let user = await User.create({
            username,
            password: hash,
            ...req.body
        })

        return res.send({username: user.username, password: (payrollNumber.toString()).slice(0, 4)})
    } catch (e) {
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
                return res.status(400).send("Dirección de Correo Duplicada")
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
        user.addTeam(team)
        return res.sendStatus(200)
    } catch (e) {
        return res.sendStatus(500)
    }
}

const getAssignedTeamsIds = async (req, res) => {
    try {
        User.findByPk(req.params.id,{
            attributes: ['name'],
            include:{
                model: Team,
                include:{
                    model: Sport,
                }
            }
        }).then(user => {
            return res.send(user.teams)
        })
    } catch (e) {
        return res.sendStatus(500)
    }
}

const token = (req, res) => {
    return res.sendStatus(200)
}

const getTrainersBySport = async (request, response) => {

    await User.findAll({
        attributes: ['payrollNumber', 'name', 'paternalLastName', 'maternalLastName', 'isActive'],
        include: {
            model: Team,
            attributes: ['sportId'],
            include: {
                model: Sport,
                attributes: ['id', 'name']
            }
        }
    }).then(async users => {

        let USERS = []
        let usersBySport = []
        await users.map(user => {
            if (user.teams[0] === undefined) {
                console.log('test')
            } else {
                let sports = []
                user.teams.map(team => {
                    sports.push({id: team.sport.id, name: team.sport.name})
                })

                USERS.push({
                    payrollNumber: user.payrollNumber,
                    name: user.name,
                    paternalLastName: user.paternalLastName,
                    maternalLastName: user.maternalLastName,
                    isActive: user.isActive,
                    sport: sports
                })
            }
        })

        await USERS.map(async user => {
            user.sport.map(sport => {
                if (sport.id == request.params.idSport) {
                    usersBySport.push({
                        ...user,
                        sport: sport
                    })
                }
            })
        })


        return response.send(usersBySport)
    })
}

const getTrainers = async (req, res) => {
    try {
        const trainers = await User.findAll({
            where: { isAdmin: 0  },
            attributes: ['name', 'paternalLastName', 'maternalLastName', 'isActive'],
            include: {
                model: Team,
                attributes: ['name'],
                through: {
                    attributes: {
                        exclude: ['teamId', 'userPayrollNumber']
                    }
                }
                
            }
        })
        return res.send(trainers)
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
    getAssignedTeamsIds,
    token,
    getTrainersBySport,
    getTrainers
}
