const Medical_Data = require("../Models/Medical_Data");
const Player = require("../Models/Player");
const Status = require("../Models/Status");
const Campus = require("../Models/Campus");
const Program = require("../Models/Program");
const Team = require("../Models/Team");
const Sport = require("../Models/Sport");
const {Op} = require('sequelize');
const Championship = require("../Models/Championship");
const Team_Player = require("../Models/Team_Player");
const itemsPerPage = 10;
/** jugadores por pagina **/

const create = async (req, res) => {
    try {
        const {
            registrationNumber,
            email,
            policyNumber,
        } = req.body

        const player = await Player.findOne({
            where: {
                [Op.or]: [
                    {registrationNumber},
                    {email},
                    {medicalDataPolicyNumber: policyNumber}
                ]
            }
        })

        if (player) {
            if ((player.registrationNumber).toString() === registrationNumber) {
                return res.status(400).send("Número de matrícula duplicado")
            } else if (player.email === email) {
                return res.status(400).send("Dirección de correo duplicada")
            } else if ((player.medicalDataPolicyNumber).toString() === policyNumber) {
                return res.status(400).send("Número de póliza duplicado")
            }
        }

        const medical = await Medical_Data.findByPk(policyNumber)

        if (medical) {
            return res.status(400).send("Número de póliza duplicado")
        }

        await Medical_Data.create({
            ...req.body
        })

        await Player.create({
            medicalDataPolicyNumber: policyNumber,
            ...req.body
        })

        return res.sendStatus(200)

    } catch (e) {
        console.log(e.message)
        return res.sendStatus(500)
    }
}

const getById = async (req, res) => {

    try {
        const player = await Player.findByPk(req.params.id, {
            include: [
                {
                    model: Program
                },
                {
                    model: Campus
                },
                {
                    model: Status
                },
                {
                    model: Team,
                    include: {
                        model: Sport
                    }
                },
                {
                    model: Medical_Data
                }
            ]
        })

        if (!player) {
            return res.sendStatus(404)
        }

        return res.send(player)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const getAll = async (req, res) => {
    try {
        const players = await Player.findAll({
            include: {
                model: Medical_Data
            }
        })

        if (players.length === 0) {
            return res.sendStatus(404)
        }

        return res.send(players)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const update = async (req, res) => {
    try {
        const {email, policyNumber} = req.body

        const player = await Player.findByPk(req.params.id)

        if (!player) {
            return res.sendStatus(404)
        }

        if (email !== undefined) {
            const player2 = await Player.findOne({
                where: {
                    email
                }
            })

            if (player2) {
                return res.status(400).send("Direccion de Correo Duplicada")
            }
        }

        if (policyNumber !== undefined) {
            const player3 = await Player.findOne({
                where: {
                    medicalDataPolicyNumber: policyNumber
                }
            })

            if (player3) {
                return res.status(400).send("Numero de Poliza Duplicada")
            }
        }

        const policy = await Medical_Data.findByPk(player.medicalDataPolicyNumber)

        await policy.update({
            ...req.body
        })
        await player.update({
            ...req.body
        })

        return res.sendStatus(201)
    } catch (e) {
        return res.sendStatus(500)
    }
}

const assignToTeam = async (req, res) => {
    try {
        const {
            teamId,
            startDate,
            endDate,
            position,
            number,
            isCaptain
        } = req.body

        const player = await Player.findByPk(req.params.id)
        const team = await Team.findByPk(teamId)

        await player.addTeam(team, {
            through: {
                startDate,
                endDate,
                isCaptain,
                position,
                number
            }
        })
        return res.sendStatus(200)
    } catch (e) {
        return res.sendStatus(500)
    }
}

const unassignToTeam = async (req, res) => {
    try {
        const {
            teamId,
            endDate
        } = req.body

        await Team_Player.update({endDate: endDate,},
            {
                where: {
                    playerRegistrationNumber: req.params.id,
                    teamId: teamId
                }
        })

        return res.sendStatus(200)
    } catch (e) {
        console.log(e.message)
        return res.sendStatus(500)
    }
}

const getTeamsByPlayer = async (req, res) => {
    let registrationNumber = req.params.id
    try {
        await Player.findByPk(registrationNumber, {
            attributes: ['registrationNumber'],
            include: [
                {
                    model: Team,
                    attributes: {
                        exclude: ['sportId', 'id']
                    },
                    through: {
                      attributes: {
                          exclude: ['teamId', 'playerRegistrationNumber']
                      }
                    },
                    include: [
                        {
                            model: Sport,
                            attributes: ['name']
                        }
                    ]
                },
            ]
        }).then(async teamsByPlayer => {
            return res.send(teamsByPlayer)
        })
    } catch (e) {
        return res.status(400).send({message: e.message})
    }
}

/**
 * En caso de que el deportista no pertenezca a algun equipo
 * se mostraran los campos como "N/A" correspondientes al deporte
 **/
const getByPage = async (req, res) => {
    let players = []
    let {page, order, by} = req.params
    const from = (((page <= 0 ? 1 : page) - 1) * itemsPerPage);
    order = order.toUpperCase();
    by = by.toUpperCase();

    if (order !== 'ASC' && order !== 'DESC') {
        order = 'ASC'
    }
    if (by !== 'NAME' && by !== 'ISACTIVE') {
        if (by === 'TEAM') {
            byTeam = true;
            by = 'NAME'
        } else if (by === 'PLAYERS') {
            byAthlete = true
            by = 'NAME'
        } else {
            by = 'NAME'
        }
    }


    /** Solo puede recibir ASC o DESC **/
    await Player.findAll({
        attributes: ['registrationNumber', 'name', 'paternalLastName', 'maternalLastName', 'isActive', 'debutYear', 'statusId'],
        order: [[by, order]],
        //limit: 1000,
        include: [
            {
                model: Team,
                attributes: ['id', 'name',],
                include: [
                    {
                        model: Sport,
                        attributes: ['id', 'name'],
                    }
                ]
            },
            {
                model: Medical_Data
            },
            {
                model: Status,
                required: true,
                attributes: ['id', 'name']
            },
        ]
    }).then(async Players => {
        console.log(Players[0].medicalDatum.src)

        Players.map(async player => {

            if (player.teams[0] === undefined) {
                await players.push({
                    registrationNumber: player.registrationNumber,
                    name: player.name,
                    paternalLastName: player.paternalLastName,
                    maternalLastName: player.maternalLastName,
                    isActive: player.isActive,
                    debutYear: player.debutYear,
                    statusId: player.statusId,
                    teams: [{
                        sport: {name: 'N/A'},
                        teamPlayer: {
                            startDate: "N/A",
                            endDate: "N/A",
                        }
                    }],
                    medicalPDF: player.medicalDatum.src,
                    status: [{
                        id: player.status.id,
                        name: player.status.name,
                    }],
                })
            } else {
                await players.push({
                    registrationNumber: player.registrationNumber,
                    name: player.name,
                    paternalLastName: player.paternalLastName,
                    maternalLastName: player.maternalLastName,
                    isCaptain: player.isCaptain,
                    isActive: player.isActive,
                    debutYear: player.debutYear,
                    statusId: player.statusId,
                    teams: [{
                        id: player.teams[player.teams.length - 1].id,
                        name: player.teams[player.teams.length - 1].name,
                        sport: {
                            name: player.teams[player.teams.length - 1].sport.name,
                            id: player.teams[player.teams.length - 1].sport.id
                        },
                        teamPlayer: {
                            startDate: player.teams[player.teams.length - 1].teamPlayer.startDate,
                            endDate: player.teams[player.teams.length - 1].teamPlayer.endDate,
                            isCaptain: player.teams[player.teams.length - 1].teamPlayer.isCaptain
                        }
                    }],
                    status: [{
                        id: player.status.id,
                        name: player.status.name,
                    }],
                })
            }
        })
        return res.send(players.slice(from, from + itemsPerPage))
    }).catch(e => {
        return res.send({message: e.message})
    })
}

const getMaxPages = async (req, res) => {
    try {
        const items = await Player.count();
        const maxPages = Math.ceil(items / itemsPerPage); // 2
        return res.send({pages: maxPages})
    } catch (e) {
        return res.status(500).send({message: 'INTERNAL_ERROR'})
    }
}

//Campeonatos
const assignToChampionship = async (req, res) => {
    try {
        const {championshipId} = req.body
        const player = await Player.findByPk(req.params.id)
        const championship = await Championship.findByPk(championshipId)

        await player.addChampionship(championship)

        return res.sendStatus(200)
    } catch (e) {
        return res.sendStatus(500)
    }
}

const getAssignedChampionship = async (req, res) => {
    try {
        Player.findByPk(req.params.id,{
            attributes: ['name'],
            include:{
                model: Championship,
                through: {
                    attributes: {
                        exclude: ['championshipId', 'playerRegistrationNumber']
                    }
                }
            }
        }).then(AssignedChampionship => {
            return res.send(AssignedChampionship)
        })
    } catch (e) {
        return res.sendStatus(500)
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    getByPage,
    getMaxPages,
    assignToTeam,
    unassignToTeam,
    getTeamsByPlayer,
    assignToChampionship,
    getAssignedChampionship
}
