const DB = require("../database/connection")
const Sequelize = require('sequelize')

const Usuario = DB.define('usuario', {
    nomina: {
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
    celular: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    correo: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true
    },
    username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(100),
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
    puesto: {
        type: Sequelize.STRING(20),
        allowNull: true
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'isActive'
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isAdmin'
    }
})

module.exports = Usuario
