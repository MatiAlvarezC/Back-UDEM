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
        allowNull: false
    },
    altura_m: {
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
        allowNull: false,
        unique: true
    },
    talla_camisa: {
        type: Sequelize.STRING(5),
        allowNull: false
    },
    talla_short: {
        type: Sequelize.STRING(5),
        allowNull: false
    },
    agno_debut: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isActive'
    },
    foto_src: {
        type: Sequelize.STRING(255),
        allowNull: true
    }
})

module.exports = Deportista
