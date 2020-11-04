const Status = require('../Models/Status')

const create = async (req, res) => {
    try {
        await Status.create({
            ...req.body
        })

        return res.sendStatus(200)

    } catch (e) {
        return res.sendStatus(e)
    }
}

const getAll = async (req, res) => {
    try {
        const status = await Status.findAll()

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
        const status = await Status.findByPk(req.params.id)

        if (!status) {
            return res.sendStatus(404)
        }

        await status.update({
            ...req.body
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
