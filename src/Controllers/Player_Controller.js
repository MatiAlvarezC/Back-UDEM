const Datos_Medicos = require("../models/Datos_Medicos");
const Deportista = require("../models/Deportista");
const Tipo_Sangre = require("../models/Tipo_Sangre");
const Estado = require("../models/Estado");
const Campus = require("../models/Campus");
const Programa = require("../models/Programa");
const Equipo = require("../models/Equipo");
const Deporte = require("../models/Deporte");
const Deporte_en_Equipo = require("../models/Deportista_en_Equipo");
const {Op} = require('sequelize')
const itemsPerPage = 10;
/** jugadores por pagina **/

const create = async (req, res) => {
    try {
        const {
            matricula,
            correo,
            datos_medicos_numero_poliza,
            numero_poliza,
        } = req.body

        const player = await Deportista.findOne({
            where: {
                [Op.or]: [
                    {matricula},
                    {correo},
                    {datos_medicos_numero_poliza}
                ]
            }
        })

        if (player) {
            if (player.matricula === matricula) {
                return res.status(400).send(["Numero de matricula duplicado"])
            } else if (player.correo === correo) {
                return res.status(400).send(["Direccion de correo duplicada"])
            } else if (player.datos_medicos_numero_poliza === numero_poliza) {
                return res.status(400).send(["Numero de poliza duplicado"])
            }
        }

        const medical = await Datos_Medicos.findByPk(numero_poliza)

        if (medical) {
            return res.status(400).send("Numero de poliza duplicado")
        }

        await Datos_Medicos.create({
            ...req.body
        })

        await Deportista.create({
            ...req.body
        })

        return res.sendStatus(200)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const getById = async (req, res) => {
    try {
        const player = await Deportista.findByPk(req.params.id, {
            include: [
                {
                    model: Programa
                },
                {
                    model: Campus
                },
                {
                    model: Estado
                },
                {
                    model: Datos_Medicos, include: {
                        model: Tipo_Sangre
                    }
                }
            ]
        })

        if (!player) {
            return res.sendStatus(404)
        }

        return res.send(player)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const getAll = async (req, res) => {
    try {
        const players = await Deportista.findAll()

        if (players.length === 0) {
            return res.sendStatus(404)
        }

        return res.send(players)

    } catch (e) {
        return res.sendStatus(500)
    }
}

const update = async (req, res) => {
    try {
        const {correo, numero_poliza} = req.body

        const player = await Deportista.findByPk(req.params.id)

        if (!player) {
            return res.sendStatus(404)
        }

        if (correo !== undefined) {
            const player2 = await Deportista.findOne({
                where: {
                    correo
                }
            })

            if (player2) {
                return res.status(400).send("Direccion de Correo Duplicada")
            }
        }

        if (numero_poliza !== undefined) {
            const player3 = await Deportista.findOne({
                where: {
                    datos_medicos_numero_poliza: numero_poliza
                }
            })

            if (player3) {
                return res.status(400).send("Numero de Poliza Duplicada")
            }
        }

        const poliza = await Datos_Medicos.findByPk(player.datos_medicos_numero_poliza)

        await poliza.update({
            ...req.body
        })

        await player.update({
            ...req.body
        })

        return res.sendStatus(201)
    } catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
}


const getByPage = async (req, res) => {
    let {page, order, by} = req.params
    const from = (((page <= 0 ? 1 : page) - 1) * itemsPerPage);
    order = order.toUpperCase();
    by = by.toUpperCase();
    /** Solo puede recibir ASC o DESC **/
    await Deportista.findAll({
        attributes: ['matricula', 'nombres', 'apellido_paterno', 'apellido_materno', 'isCaptain', 'isActive', 'agno_debut', 'estado_id'],
        order: [[by, order]],
        //limit: 1000,
        include: [
            {
                model: Equipo,
                attributes: ['id', 'nombre'],
                include: [
                    {
                        model: Deporte,
                        attributes: ['id', 'nombre'],
                    }

                ]
            },
        ]
    }).then(async Deportistas => {
        return res.send(Deportistas.slice(from, from + itemsPerPage))
    })
}

const getMaxPages = async (req, res) => {
    try {
        const items = await Deportista.count();
        const maxPages = Math.ceil(items / itemsPerPage); // 2
        return res.send({pages: maxPages})
    } catch (e) {
        return res.status(500).send({message: 'INTERNAL_ERROR'})
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    getByPage,
    getMaxPages
}
