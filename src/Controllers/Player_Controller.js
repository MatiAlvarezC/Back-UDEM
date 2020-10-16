const Datos_Medicos = require("../models/Datos_Medicos");
const Deportista = require("../models/Deportista");

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

        console.log(tipo_sangre_id)

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

    } catch (e){
        console.log(e)
        return res.sendStatus(500)
    }
}

module.exports = {
    create
}
