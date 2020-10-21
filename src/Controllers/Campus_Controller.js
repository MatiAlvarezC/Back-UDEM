const Campus = require("../models/Campus");


const create = async (req, res) => {
    try{
        const { nombre } = req.body

        await Campus.create({
            nombre
        })

        return res.sendStatus(200)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const getAll = async (req, res) => {
    try {
        const campus = Campus.findAll()

        if(campus.length === 0) {
            return res.sendStatus(404)
        }

        return res.send({"ewe": "owo"})

    } catch (e) {
        return res.sendStatus(500)
    }
}

const update = async (req, res) => {
    try {
        const nombre = req.body

        const campus = Campus.findByPk(req.params.id)

        if(!campus) {
            return res.sendStatus(404)
        }

        campus.update({
            nombre
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
