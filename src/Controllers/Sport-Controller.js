const Deporte = require('../models/Deporte')
const Equipo = require('../models/Equipo')
const Deportista = require('../models/Deportista')

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

/** ======= FUNCIONES DE CONTEO PARA EQUIPOS Y JUGADORES======= **/

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

/** ======= FUNCIONES CRUD ======= **/

const create = async (req, res) => {
    const {nombre, isActive} = req.body
    if (isActive == null || nombre == null) {
        return res.status(400).send({message: 'Uno de los campos esta vacio'})
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

const update = (req, res) => {
    try {
        Deporte.update({
            ...req.body
        }, {where: {id: req.body.id}}).then(result => {
            return res.send(result)
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
    const itemsPerPage = 12;
    const from = (((page <= 0 ? 1 : page) - 1) * itemsPerPage);
    order = order.toUpperCase();
    /** Solo puede recibir ASC o DESC **/
    let byTeam = false;
    let byAthlete = false;
    if (order !== 'ASC' && order !== 'DESC') {
        order = 'ASC'
    }
    if (by !== 'nombre' && by !== 'isActive') {
        if (by === 'Equipos') {
            byTeam = true;
            by = 'nombre'
        } else if (by === 'deportistas') {
            byAthlete = true
            by = 'nombre'
        } else {
            by = 'nombre'
        }
    }
    try {
        await Deporte.findAll({
            attributes: ['nombre', 'id', 'src', 'isActive'],
            order: [[by, order]],
            offset: from,
            limit: itemsPerPage,
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
            let deportes = await getCounts(DEPORTES)
            if (byTeam) {
                return res.send(await deportes.sort((order === 'ASC') ? compareToHighest : compareToLowest))
            } else if (byAthlete) {
                return res.send(await deportes.sort((order === 'ASC') ? compareToHighestA : compareToLowestA))
            } else {
                return res.send(deportes)
            }
        })
    } catch (e) {
        return res.status(500).send({message: e.message})
    }
}


const getByID = (req, res) => {
    try {
        Deporte.findByPk(req.params['id']).then(deporte => {
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

module.exports = {
    create,
    update,
    getAll,
    getByID,
    getByPage
}
