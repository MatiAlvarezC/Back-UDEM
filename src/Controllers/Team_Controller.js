const Player = require('../Models/Player')
const Team = require('../Models/Team')
const Championship = require('../Models/Championship')

/** ======= FUNCIONES CRUD ======= **/
const create = async (req, res) => {
    const {name, isActive, sportId, gender} = req.body
    if (isActive == null || name == null || sportId == null) {
        return res.status(400).send({message: 'Uno de los campos esta vacío'})
    }
    try {
        const team = await Team.findOne({where: {name, gender, sportId}})
        if (team) {
            return res.status(400).send("Equipo ya existente")
        }

        Team.create({
            ...req.body
        }).then(team => {
            return res.send(team)
        })
    } catch (e) {
        console.log(e.message)
        return res.status(400).send({message: e.message})
    }
}

const update = async (req, res) => {
    try {
        await Team.update({
            ...req.body
        }, {where: {id: req.params.id}}).then(() => {
            return res.send({status: 'SUCCESS'})
        }).catch(e => {
            return res.status(400).send({message: e.message})
        })
    } catch (e) {
        return res.status(400).send({message: e.message})
    }
}

const getAll = async (req, res) => {
    try {
        await Team.findAll({
            attributes: ['name', 'id', 'isActive'],
            order: [['name', 'ASC']],
            include: [
                {
                    model: Player,
                    attributes: ['name'],
                }
            ]
        }).then(async TEAMS => {
            return res.send(await getCounts(TEAMS))
        })
    } catch (e) {
        return res.status(400).send({message: e.message})
    }
}

const getByID = (req, res) => {
    try {
        Team.findByPk(req.params['id']).then(team => {
            if (team == null) {
                return res.status(404).send({message: 'NOT_FOUND'})
            } else {
                return res.send(team)
            }
        })
    } catch (e) {
        return res.status(400).send({message: e.message})
    }
}

const getBySport = async (req, res) => {
    try {
        const team = await Team.findAll({where: {sportId: req.params.id}})

        if (team.length === 0) {
            return res.sendStatus(404)
        }

        return res.send(team)
    } catch (e) {
        return res.sendStatus(500)
    }
}

/** ======= FUNCIONES CRUD ======= **/

async function getCounts(TEAMS) {
    let teams = new Array(0)
    for (let i = 0; i < TEAMS.length; i++) {
        await teams.push({
            id: TEAMS[i].id,
            name: TEAMS[i].name,
            gender: TEAMS[i].gender,
            isActive: TEAMS[i].isActive,
            sportId: TEAMS[i].sportId,
            players: TEAMS[i].players.length
        })
    }
    return teams
}


//Campeonatos
const assignToChampionship = async (req, res) => {
    try {
        const {championshipId} = req.body
        const team = await Team.findByPk(req.params.id)
        const championship = await Championship.findByPk(championshipId)

        await team.addChampionship(championship)

        return res.sendStatus(200)
    } catch (e) {
        return res.sendStatus(500)
    }
}

const getAssignedChampionship = async (req, res) => {
    try {
        Team.findByPk(req.params.id,{
            attributes: ['name'],
            include:{
                model: Championship,
                through: {
                    attributes: {
                        exclude: ['championshipId', 'teamId']
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
    update,
    getAll,
    getByID,
    getBySport,
    assignToChampionship,
    getAssignedChampionship
}
