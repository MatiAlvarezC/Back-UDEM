const { model } = require('../database/connection')
const Datos_Medicos = require('../models/Datos_Medicos')
const Deportista = require('../models/Deportista')

const getPoliciesByExpiration = async (req, res) => {
    try {
        const datosMedicos = await Datos_Medicos.findAll({
            attributes: ['numero_poliza', 'vigencia_poliza', 'dias_restantes'],
            order: [['vigencia_poliza', 'ASC']],
            include: [
                {
                    model: Deportista,
                    as: "deportista",
                    attributes: [
                        'matricula',
                        'nombres',
                        'apellido_paterno',
                        'apellido_materno'
                    ],
                }
            ],
        })

        if (datosMedicos.length === 0) {
            return res.sendStatus(404)
        }

        return res.send(datosMedicos)

    } catch (e) {
        console.log('ERROR', e)
        return res.sendStatus(500)
    }
}

module.exports = {
    getPoliciesByExpiration
}
