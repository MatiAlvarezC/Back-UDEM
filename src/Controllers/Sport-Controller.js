const Deporte = require('../models/Deporte')

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

const getAll = (req, res) => {
    try {
        Deporte.findAll().then(deportes => {
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
