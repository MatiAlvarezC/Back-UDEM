const Datos_Medicos = require("../models/Datos_Medicos");
const Deportista = require("../models/Deportista");
const Tipo_Sangre = require("../models/Tipo_Sangre");
const Estado = require("../models/Estado");
const Campus = require("../models/Campus");
const Programa = require("../models/Programa");

const create = async (req, res) => {
    try {

        const {
            matricula,
            nombres,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            altura,
            peso_kg,
            celular,
            correo,
            talla_camisa,
            talla_short,
            agno_debut,
            isCaptain,
            isActive,
            estado_id,
            programa_id,
            campus_id,
            numero_poliza,
            vigencia_poliza,
            telefono_aseguradora,
            condiciones_aseguradora,
            nombre_contacto_emergencia,
            telefono_contacto_emergencia,
            enfermedades,
            medicamentos,
            cirugias_previas,
            tipo_sangre_id
        } = req.body

        await Datos_Medicos.create({
            numero_poliza,
            vigencia_poliza,
            telefono_aseguradora,
            condiciones_aseguradora,
            nombre_contacto_emergencia,
            telefono_contacto_emergencia,
            enfermedades,
            medicamentos,
            cirugias_previas,
            tipo_sangre_id
        })

        await Deportista.create({
            matricula,
            nombres,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            altura,
            peso_kg,
            celular,
            correo,
            talla_camisa,
            talla_short,
            agno_debut,
            isCaptain,
            isActive,
            estado_id,
            programa_id,
            campus_id,
            datos_medicos_numero_poliza: numero_poliza
        })

        return res.sendStatus(200)

    } catch (e) {
        console.log(e)
        return res.sendStatus(500)
    }
}

const getById = async (req, res) => {
    try {
        const player = await Deportista.findByPk(req.params.id, {
            include: [{
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
        const {
            nombres,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            altura,
            peso_kg,
            celular,
            correo,
            talla_camisa,
            talla_short,
            agno_debut,
            isCaptain,
            estado_id,
            programa_id,
            campus_id
        } = req.body

        const player = await Deportista.findByPk(req.params.id)

        if (!player) {
            return res.sendStatus(404)
        }

        await player.update({
            nombres,
            apellido_paterno,
            apellido_materno,
            fecha_nacimiento,
            altura,
            peso_kg,
            celular,
            correo,
            talla_camisa,
            talla_short,
            agno_debut,
            isCaptain,
            estado_id,
            programa_id,
            campus_id
        })

        return res.sendStatus(201)
    } catch (e) {
        return res.sendStatus(500)
    }
}

const updateStatus = (req, res) => {
    try {
        const isActive = req.body

        const player = Deportista.findByPk(req.params.id)

        if(!player) {
            return res.sendStatus(404)
        }

        player.update({
            isActive
        })

        return res.sendStatus(201)
    } catch (e) {
        return res.sendStatus(500)
    }
}

module.exports = {
    create,
    getById,
    getAll,
    update,
    updateStatus
}
