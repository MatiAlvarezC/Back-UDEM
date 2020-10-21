const Estado = require('../models/Estado')

const create = async (req, res) => {
    try {
        const {
            nombre,
            isActive
        } = req.body

        await Estado.create({
            nombre,
            isActive
        })

        return res.sendStatus(200)

    } catch (e) {
        return res.sendStatus(e)
    }
}

const getAll = async (req, res) => {
    try {
        const status = Estado.findAll()

        if (status.length === 0) {
            return res.sendStatus(404)
        }

        return res.send(status)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const update = async (req, res) => {
    try {
        const {
            nombre,
            isActive
        } = req.body

        const status = Estado.findByPk(req.params.id)

        if (!status) {
            return res.sendStatus(404)
        }

        status.update({
            nombre,
            isActive
        })

        return res.sendStatus(201)

    } catch (e) {
        return res.sendStatus(500)
    }
}

module.exports = {
    create,
    getAll,
    update
}
