const Tipo_Sangre = require('../models/Tipo_Sangre')

const getAll = async (req, res) => {
    try {
        const blood = await Tipo_Sangre.findAll()

        if (blood.length === 0) {
            return res.sendStatus(404)
        }

        return res.send(blood)

    } catch (e) {
        return res.sendStatus(500)
    }
}

module.exports = {
    getAll
}
