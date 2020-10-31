const Datos_Medicos = require('../models/Datos_Medicos')
const Deportista = require('../models/Deportista')
const Estado = require('../models/Estado')
const {Op} = require('sequelize')
const itemsPerPage = 10
const idIntercambio = 4
const idGraduado    = 5
const idBajaAdmin   = 6

const getMaxPages = async (req, res) => {
    try {
        const items = await Datos_Medicos.count({
            include: {
                model: Deportista,
                required: true,
                as: "deportista",
                include: {
                    model: Estado,
                    attributes: ['nombre'],
                    where: {
                        [Op.not]: [
                            {id: [idIntercambio, idGraduado, idBajaAdmin]}
                        ]
                    }
                }
            }
        })
        const maxPages = Math.ceil(items / itemsPerPage)
        return res.send({pages: maxPages})
    } catch (e) {
        return res.status(500).send({message: e.message})
    }
}

const getByPage = async (req, res) => {
    let {page} = req.params
    const from = ((page <= 0 ? 1 : page) - 1) * itemsPerPage
    try {
        const datosMedicos = await Datos_Medicos.findAll({
            attributes: ['numero_poliza', 'vigencia_poliza', 'dias_restantes'],
            order: [['vigencia_poliza', 'ASC']],
            offset: from,
            limit: itemsPerPage,
            include: [
                {
                    model: Deportista,
                    required: true,
                    as: "deportista",
                    attributes: [
                        'matricula',
                        'nombres',
                        'apellido_paterno',
                        'apellido_materno'
                    ],
                    include: {
                        model: Estado,
                        attributes: ['nombre'],
                        where: {
                            [Op.not]: [
                                {id: [idIntercambio, idGraduado, idBajaAdmin]}
                            ]
                        }
                    }
                }
            ]
        })

        if (datosMedicos.length === 0) {
            return res.sendStatus(404)
        }

        return res.send(datosMedicos)

    } catch (e) {
        return res.sendStatus(500)
    }
}

module.exports = {
    getMaxPages,
    getByPage
}
