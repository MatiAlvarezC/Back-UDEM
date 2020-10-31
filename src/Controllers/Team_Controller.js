const Deportista = require('../models/Deportista')
const Equipo = require('../models/Equipo')

/** ======= FUNCIONES CRUD ======= **/
const create = async (req, res) => {
    const {nombre, isActive, deporte_id, genero_id} = req.body
    if (isActive == null || nombre == null || deporte_id == null || genero_id == null) {
        return res.status(400).send({message: 'Uno de los campos esta vacío'})
    } else {
        try {
            await Equipo.findOne({where: {nombre}}).then(result => {
                if (result !== null) {
                    throw Error('Equipo Existente')
                } else {
                    Equipo.create({
                        ...req.body
                    }).then(equipo => {
                        return res.send(equipo)
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
        await Equipo.update({
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
        await Equipo.findAll({
            attributes: ['nombre', 'id', 'isActive'],
            order: [['nombre', 'ASC']],
            include: [
                {
                    model: Deportista,
                    attributes: ['nombres'],
                }
            ]
        }).then(async EQUIPOS => {
            return res.send(await getCounts(EQUIPOS))
        })
    } catch (e) {
        return res.status(400).send({message: e.message})
    }
}

const getByID = (req, res) => {
    try {
        Equipo.findByPk(req.params['id']).then(equipo => {
            if (equipo == null) {
                return res.status(404).send({message: 'NOT_FOUND'})
            } else {
                return res.send(equipo)
            }
        })
    } catch (e) {
        return res.status(400).send({message: e.message})
    }
}
/** ======= FUNCIONES CRUD ======= **/

async function getCounts(EQUIPOS) {
    let equipos = new Array(0)
    for (let i = 0; i < EQUIPOS.length; i++) {
        await equipos.push({
            id: EQUIPOS[i].id,
            nombre: EQUIPOS[i].nombre,
            isActive: EQUIPOS[i].isActive,
            deporte_id: EQUIPOS[i].deporte_id,
            genero_id: EQUIPOS[i].genero_id,
            deportistas: EQUIPOS[i].deportista.length
        })
        aux = 0;
    }
    return equipos
}

module.exports = {
    create,
    update,
    getAll,
    getByID,
}
