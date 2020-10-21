const Program = require('../models/Programa')

const create = async (req, res) => {
    try{
        await Program.create({
            ...req.body
        })

        return res.sendStatus(200)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const getAll = async (req, res) => {
    try {
        const program = await Program.findAll()

        if(program.length === 0) {
            return res.sendStatus(404)
        }
        return res.send(program)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const update = async (req, res) => {
    try {
        const program = await Program.findByPk(req.params.id)

        if(!program) {
            return res.sendStatus(404)
        }

        await program.update({
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
    update,
}
