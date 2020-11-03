const Sport = require('../Models/Sport')
const Team = require('../Models/Team')
const Player = require('../Models/Player')
const User = require('../Models/User')
const {Op} = require('sequelize')
const itemsPerPage = 6; /** deportes por pagina **/
const coachesPerPage = 6;

/** ======= FUNCIONES DE ORDENAMIENTO ======= **/
/**
 * @param a
 * @param b
 * @returns {number}
 */
function compareToLowest(a, b) {
    if (a.teams > b.teams) {
        return -1;
    }
    if (a.teams < b.teams) {
        return 1;
    }
    return 0;
}

function compareToHighest(a, b) {
    if (a.teams < b.teams) {
        return -1;
    }
    if (a.teams > b.teams) {
        return 1;
    }
    return 0;
}

function compareToLowestA(a, b) {
    if (a.players > b.players) {
        return -1;
    }
    if (a.players < b.players) {
        return 1;
    }
    return 0;
}

function compareToHighestA(a, b) {
    if (a.players < b.players) {
        return -1;
    }
    if (a.players > b.players) {
        return 1;
    }
    return 0;
}

/** ======= FUNCIONES DE ORDENAMIENTO ======= **/

/** ======= FUNCIONES DE CONTEO PARA EQUIPOS Y JUGADORES ======= **/

/**
 * @param SPORTS
 * @returns {Promise<any[]>}
 * Recibe como parámetro un arreglo de objetos
 * Retorna un arreglo de objetos con la cantidad de equipos y jugadores correspondiente a cada deporte
 * **/

async function getCounts(SPORTS) {
    let aux = 0;
    let sports = new Array(0)
    for (let i = 0; i < SPORTS.length; i++) {
        for (let j = 0; j < SPORTS[i].teams.length; j++) {
            aux += SPORTS[i].teams[j].players.length /**CONTADOR DE JUGADORES POR EQUIPO**/
        }
        await sports.push({
            id: SPORTS[i].id,
            name: SPORTS[i].name,
            src: SPORTS[i].src,
            isActive: SPORTS[i].isActive,
            teams: SPORTS[i].teams.length,
            players: aux
        })
        aux = 0;
    }
    return sports
}

/** ======= FUNCIONES DE CONTEO PARA EQUIPOS Y JUGADORES======= **/

/** ======= FUNCIONES DE FILTRO======= **/
/**
 *
 * Filtros de isActive, devuelve los deportes Habilitados/Deshabilitados
 * y si non es el filtro que se solicita, devuelve la lista de deportes con ordenamiento.
 * @param SPORTS
 * @param data
 * @returns object
 */
async function filterByActive(SPORTS, data) {
    let {byTeam, byAthlete, from, itemsPerPage, order} = data
    let sports = await getCounts(SPORTS)
    if (byTeam) {
        sports = await sports.sort((order === 'ASC') ? compareToHighest : compareToLowest)
        return sports.slice(from, from + itemsPerPage)
    } else if (byAthlete) {
        sports = await sports.sort((order === 'ASC') ? compareToHighestA : compareToLowestA)
        return sports.slice(from, from + itemsPerPage)
    } else {
        return sports.slice(from, from + itemsPerPage)
    }
}

/** ======= FUNCIONES DE FILTRO======= **/


/** ======= FUNCIONES CRUD ======= **/

const create = async (req, res) => {
    const {name: name, isActive} = req.body
    if (isActive == null || name == null) {
        return res.status(400).send({message: 'Uno de los campos esta vacío'})
    } else {
        try {
            await Sport.findOne({where: {name: name}}).then(result => {
                if (result !== null) {
                    throw Error('Deporte Existente')
                } else {
                    Sport.create({
                        ...req.body
                    }).then(sport => {
                        return res.send(sport)
                    })
                }
            })
        } catch (e) {
            return res.status(400).send({message: e.message})
        }
    }
}

const update = async (req, res) => {
    try {
        await Sport.update({
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
        await Sport.findAll({
            attributes: ['name', 'id', 'src', 'isActive'],
            order: [['name', 'ASC']],
            include: [
                {
                    model: Team,
                    attributes: ['name'],
                    include: [
                        {
                            model: Player,
                            attributes: ['name'],
                        }
                    ]
                }
            ]
        }).then(async SPORTS => {
            return res.send(await getCounts(SPORTS))
        })
    } catch (e) {
        return res.status(400).send({message: e.message})
    }
}
/** ======= FUNCIONES CRUD ======= **/

/** ======= Obtención de lista de deportes por pagina, orden y tipo ======= **/
const getByPage = async (req, res) => {
    let {page, order, by} = req.params
    const from = (((page <= 0 ? 1 : page) - 1) * itemsPerPage);
    order = order.toUpperCase();
    by = by.toUpperCase();
    /** Solo puede recibir ASC o DESC **/
    let byTeam = false;
    let byAthlete = false;
    if (order !== 'ASC' && order !== 'DESC') {
        order = 'ASC'
    }
    if (by !== 'NAME' && by !== 'ISACTIVE') {
        if (by === 'TEAMS') {
            byTeam = true;
            by = 'NAME'
        } else if (by === 'PLAYERS') {
            byAthlete = true
            by = 'NAME'
        } else {
            by = 'NAME'
        }
    }
    try {
        if (by === 'ISACTIVE') {
            await Sport.findAll({
                attributes: ['name', 'id', 'src', 'isActive'],
                order: [[by, order]],
                //offset: from,
                //limit: itemsPerPage,
                where: {isActive: order === 'ASC'},
                include: [
                    {
                        model: Team,
                        attributes: ['name'],
                        include: [
                            {
                                model: Player,
                                attributes: ['name'],
                            }
                        ]
                    }
                ]
            }).then(async SPORTS => {
                let data = {byTeam, byAthlete, from, itemsPerPage, order}
                return res.send(await filterByActive(SPORTS, data))
            })
        } else {
            await Sport.findAll({
                attributes: ['name', 'id', 'src', 'isActive'],
                order: [[by, order]],
                //offset: from,
                //limit: itemsPerPage,
                include: [
                    {
                        model: Team,
                        attributes: ['name'],
                        include: [
                            {
                                model: Player,
                                attributes: ['name'],
                            }
                        ]
                    }
                ]
            }).then(async SPORTS => {
                let data = {byTeam, byAthlete, from, itemsPerPage, order}
                return res.send(await filterByActive(SPORTS, data))
            })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).send({message: e.message})
    }
}
/** ======= Obtención de lista de deportes por pagina, orden y tipo ======= **/

const getMaxPages = async (req, res) => {
    try {
        const items = await Sport.count();
        const maxPages = Math.ceil(items / itemsPerPage); // 2
        return res.send({pages: maxPages})
    } catch (e) {
        return res.status(500).send({message: 'INTERNAL_ERROR'})
    }
}

const getByID = (req, res) => {
    try {
        Sport.findByPk(req.params['id'], {
            attributes: {exclude: ['src']},
            include: {
                model: Team,
                include: [
                    {
                        model: Player,
                        attributes: ['registrationNumber', 'name', 'paternalLastName', 'maternalLastName', 'isActive', 'debutYear', 'statusId']
                    },
                    {
                        model: User,
                        attributes: ['name', 'paternalLastName', 'maternalLastName', 'payrollNumber']
                    }
                ]
            }
        }).then(deporte => {
            if (deporte == null) {
                return res.status(404).send({message: 'NOT_FOUND'})
            } else {
                return res.send(deporte)
            }
        })
    } catch (e) {
        return res.status(400).send({message: e.message})
    }
}

const getMaxPagesForCoaches = async (req, res) => {
    try {
        const items = await User.count( {
            where: {
                [Op.not]: [
                    {isAdmin: [true]}
                ]
            },
            include: [
                {
                    model: Team,
                    required: true,
                    include: [
                        {
                            model: Sport,
                            required: true,
                            where: {
                                id: req.params.id
                            }
                        }
                    ]
                }
            ]
        });
        const maxPages = Math.ceil(items / coachesPerPage); // 2
        return res.send({pages: maxPages})
    } catch (e) {
        return res.status(500).send({message: 'INTERNAL_ERROR'})
    }
}

const getCoachesByPage = async (req, res) => {
    try {

        let page = req.params.page
        const from = ((page <= 0 ? 1 : page) - 1) * coachesPerPage
        const userIds = await Usuario.findAll({
            offset: from,
            limit: coachesPerPage,
            attributes: [
                'payrollNumber',
                'name',
                'paternalLastName',
                'maternalLastName',
                'phone',
                'email',
                'occupation',
                'isActive'
            ],
            where: {
                [Op.not]: [
                    {isAdmin: [true]}
                ]
            },
            include: [
                {
                    model: Team,
                    include: [
                        {
                            model: Sport,
                            required: true,
                            where: {
                                id: req.params.id
                            }
                        }
                    ]
                }
            ]
        });

        if (userIds.length === 0) {
            return res.sendStatus(404)
        }

        return res.send(userIds)
    } catch (e) {
        return res.sendStatus(500)
    }
}

module.exports = {
    create,
    update,
    getAll,
    getByID,
    getByPage,
    getMaxPages,
    getCoachesByPage,
    getMaxPagesForCoaches
}
