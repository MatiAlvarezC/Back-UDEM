const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const create = async (req, res) => {
    try{

        const {
            matricula,
            nombres,
            apellido_paterno,
            apellido_materno,
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

    }
}
