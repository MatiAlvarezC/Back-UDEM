const Deporte = require('../models/Deporte')
const Equipo = require('../models/Equipo')
const Deportista = require('../models/Deportista')

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
        let deportes = new Array(0)
        await Deporte.findAll({
            attributes: ['nombre', 'id', 'src', 'isActive'],
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
            let aux = 0;
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
            return res.send(deportes)
        })
    } catch (e) {
        return res.status(400).send({message: e.message})
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
    getByID
}
