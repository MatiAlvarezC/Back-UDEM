const DB = require("../database/connection")
const Sequelize = require('sequelize')

const Deportista = DB.define('deportista', {
    matricula: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    nombres: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    apellido_paterno: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    apellido_materno: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    fecha_nacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    altura: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    peso_kg: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    celular: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    correo: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    talla_camisa: {
        type: Sequelize.STRING(3),
        allowNull: true
    },
    talla_short: {
        type: Sequelize.STRING(3),
        allowNull: true
    },
    agno_debut: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    isCaptain: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isCaptain'
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isActive'
    }
})

module.exports = Deportista
