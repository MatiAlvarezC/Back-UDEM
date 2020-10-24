const DB = require("../database/connection")
const Sequelize = require('sequelize')

const Deportista_en_Equipo = DB.define('deportista_en_equipo', {
    fecha_inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    fecha_salida: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    posicion: {
        type: Sequelize.STRING(30),
        allowNull: true
    },
    numero: {
        type: Sequelize.TINYINT,
        allowNull: true
    },
    isCaptain: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isCaptain'
    }
})

module.exports = Deportista_en_Equipo
