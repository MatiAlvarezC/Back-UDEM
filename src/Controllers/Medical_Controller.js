const Medical_Data = require('../Models/Medical_Data')
const Player = require('../Models/Player')
const Status = require('../Models/Status')
const {Op} = require('sequelize')
const itemsPerPage = 10
const idIntercambio = 4
const idGraduado    = 5
const idBajaAdmin   = 6

const getMaxPages = async (req, res) => {
    try {
        const items = await Medical_Data.count({
            include: {
                model: Player,
                required: true,
                include: {
                    model: Status,
                    attributes: ['name'],
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
        const datosMedicos = await Medical_Data.findAll({
            attributes: ['policyNumber', 'policyValidity'],
            order: [['policyValidity', 'ASC']],
            offset: from,
            limit: itemsPerPage,
            include: [
                {
                    model: Player,
                    required: true,
                    attributes: [
                        'registrationNumber',
                        'name',
                        'paternalLastName',
                        'maternalLastName'
                    ],
                    include: {
                        model: Status,
                        attributes: ['name'],
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
