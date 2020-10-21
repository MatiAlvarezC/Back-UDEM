const Campus = require("../models/Campus");


const create = async (req, res) => {
    try{
<<<<<<< HEAD
        const { nombre } = req.body

=======
>>>>>>> 6e4505d1b778d05ad82edd850438fd375ee9d835
        await Campus.create({
            ...req.body
        })

        return res.sendStatus(200)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const getAll = async (req, res) => {
    try {
        const campus = await Campus.findAll()

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
        const campus = await Campus.findByPk(req.params.id)

        if(!campus) {
            return res.sendStatus(404)
        }

        await campus.update({
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
