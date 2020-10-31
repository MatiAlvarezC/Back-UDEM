const {Op} = require('sequelize')
const Deporte = require('../models/Deporte')
const Equipo = require('../models/Equipo')
const Deportista = require('../models/Deportista')
const Usuario = require('../models/Usuario')
const itemsPerPage = 6; /** deportes por pagina **/
const coachesPerPage = 6;

/** ======= FUNCIONES DE ORDENAMIENTO ======= **/
/**
 * @param a
 * @param b
 * @returns {number}
 */
function compareToLowest(a, b) {
    if (a.equipos > b.equipos) {
        return -1;
    }
    if (a.equipos < b.equipos) {
        return 1;
    }
    return 0;
}

function compareToHighest(a, b) {
    if (a.equipos < b.equipos) {
        return -1;
    }
    if (a.equipos > b.equipos) {
        return 1;
    }
    return 0;
}

function compareToLowestA(a, b) {
    if (a.deportistas > b.deportistas) {
        return -1;
    }
    if (a.deportistas < b.deportistas) {
        return 1;
    }
    return 0;
}

function compareToHighestA(a, b) {
    if (a.deportistas < b.deportistas) {
        return -1;
    }
    if (a.deportistas > b.deportistas) {
        return 1;
    }
    return 0;
}

/** ======= FUNCIONES DE ORDENAMIENTO ======= **/

/** ======= FUNCIONES DE CONTEO PARA EQUIPOS Y JUGADORES ======= **/

/**
 * @param DEPORTES
 * @returns {Promise<any[]>}
 * Recibe como parámetro un arreglo de objetos
 * Retorna un arreglo de objetos con la cantidad de equipos y jugadores correspondiente a cada deporte
 * **/

async function getCounts(DEPORTES) {
    let aux = 0;
    let deportes = new Array(0)
    for (let i = 0; i < DEPORTES.length; i++) {
        for (let j = 0; j < DEPORTES[i].equipos.length; j++) {
            aux += DEPORTES[i].equipos[j].deportista.length /**CONTADOR DE JUGADORES POR EQUIPO**/
        }
        await deportes.push({
            id: DEPORTES[i].id,
            nombre: DEPORTES[i].nombre,
            src: DEPORTES[i].src,
            isActive: DEPORTES[i].isActive,
            equipos: DEPORTES[i].equipos.length,
            deportistas: aux
        })
        aux = 0;
    }
    return deportes
}

/** ======= FUNCIONES DE CONTEO PARA EQUIPOS Y JUGADORES======= **/

/** ======= FUNCIONES DE FILTRO======= **/
/**
 *
 * Filtros de isActive, devuelve los deportes Habilitados/Deshabilitados
 * y si non es el filtro que se solicita, devuelve la lista de deportes con ordenamiento.
 * @param DEPORTES
 * @param data
 * @returns object
 */
async function filterByActive(DEPORTES, data) {
    let {byTeam, byAthlete, from, itemsPerPage, order} = data
    let deportes = await getCounts(DEPORTES)
    if (byTeam) {
        deportes = await deportes.sort((order === 'ASC') ? compareToHighest : compareToLowest)
        return deportes.slice(from, from + itemsPerPage)
    } else if (byAthlete) {
        deportes = await deportes.sort((order === 'ASC') ? compareToHighestA : compareToLowestA)
        return deportes.slice(from, from + itemsPerPage)
    } else {
        return deportes.slice(from, from + itemsPerPage)
    }
}

/** ======= FUNCIONES DE FILTRO======= **/


/** ======= FUNCIONES CRUD ======= **/

const create = async (req, res) => {
    const {nombre, isActive} = req.body
    if (isActive == null || nombre == null) {
        return res.status(400).send({message: 'Uno de los campos esta vacío'})
    } else {
        try {
            await Deporte.findOne({where: {nombre}}).then(result => {
                if (result !== null) {
                    throw Error('Deporte Existente')
                } else {
                    Deporte.create({
                        ...req.body
                    }).then(deporte => {
                        return res.send(deporte)
                    })
                }
            })
        } catch (e) {
            console.log(e.message)
            return res.status(400).send({message: e.message})
        }
    }
}

const update = async (req, res) => {
    try {
        await Deporte.update({
            ...req.body
        }, {where: {id: req.params.id}}).then(result => {
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
        await Deporte.findAll({
            attributes: ['nombre', 'id', 'src', 'isActive'],
            order: [['nombre', 'ASC']],
            include: [
                {
                    model: Equipo,
                    attributes: ['nombre'],
                    include: [
                        {
                            model: Deportista,
                            attributes: ['nombres'],
                        }
                    ]
                }
            ]
        }).then(async DEPORTES => {
            return res.send(await getCounts(DEPORTES))
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
    if (by !== 'NOMBRE' && by !== 'ISACTIVE') {
        if (by === 'EQUIPOS') {
            byTeam = true;
            by = 'NOMBRE'
        } else if (by === 'DEPORTISTAS') {
            byAthlete = true
            by = 'NOMBRE'
        } else {
            by = 'NOMBRE'
        }
    }
    try {
        if (by === 'ISACTIVE') {
            await Deporte.findAll({
                attributes: ['nombre', 'id', 'src', 'isActive'],
                order: [[by, order]],
                //offset: from,
                //limit: itemsPerPage,
                where: {isActive: order === 'ASC'},
                include: [
                    {
                        model: Equipo,
                        attributes: ['nombre'],
                        include: [
                            {
                                model: Deportista,
                                attributes: ['nombres'],
                            }
                        ]
                    }
                ]
            }).then(async DEPORTES => {
                let data = {byTeam, byAthlete, from, itemsPerPage, order}
                return res.send(await filterByActive(DEPORTES, data))
            })
        } else {
            await Deporte.findAll({
                attributes: ['nombre', 'id', 'src', 'isActive'],
                order: [[by, order]],
                //offset: from,
                //limit: itemsPerPage,
                include: [
                    {
                        model: Equipo,
                        attributes: ['nombre'],
                        include: [
                            {
                                model: Deportista,
                                attributes: ['nombres'],
                            }
                        ]
                    }
                ]
            }).then(async DEPORTES => {
                let data = {byTeam, byAthlete, from, itemsPerPage, order}
                return res.send(await filterByActive(DEPORTES, data))
            })
        }

    } catch (e) {
        return res.status(500).send({message: e.message})
    }
}
/** ======= Obtención de lista de deportes por pagina, orden y tipo ======= **/

const getMaxPages = async (req, res) => {
    try {
        const items = await Deporte.count();
        const maxPages = Math.ceil(items / itemsPerPage); // 2
        return res.send({pages: maxPages})
    } catch (e) {
        return res.status(500).send({message: 'INTERNAL_ERROR'})
    }
}

const getByID = (req, res) => {
    try {
        Deporte.findByPk(req.params['id'], {
            attributes: {exclude: ['src']},
            include: {
                model: Equipo,
                include: [
                    {
                        model: Deportista,
                        attributes: ['matricula', 'nombres', 'apellido_paterno', 'apellido_materno', 'isCaptain', 'isActive', 'agno_debut', 'estado_id']
                    },
                    {
                        model: Usuario,
                        attributes: ['nombres', 'apellido_paterno', 'apellido_materno', 'nomina']
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
        const items = await Usuario.count( {
            where: {
                [Op.not]: [
                    {isAdmin: [true]}
                ]
            },
            include: [
                {
                    model: Equipo,
                    where: {
                        id: req.params.id
                    }
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

        const userIds = await Equipo.findAll({
            offset: from,
            limit: itemsPerPage,
            attributes: ['id'],
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Usuario,
                    required: true,
                    attributes: [
                        'nomina',
                        'nombres',
                        'apellido_paterno',
                        'apellido_materno',
                        'celular',
                        'correo',
                        'puesto',
                        'isActive'
                    ],
                    where: {
                        [Op.not]: [
                            {isAdmin: [true]}
                        ]
                    }
                }
            ]
        });
        if (userIds.length === 0) {
            return res.sendStatus(404)
        }

        return res.send(userIds)
    } catch (e) {
        console.log(e)
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
