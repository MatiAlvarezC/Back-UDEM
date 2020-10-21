const DB = require("../database/connection")
const Sequelize = require('sequelize')

const Estado = DB.define('estado', {
    id: {
        type: Sequelize.TINYINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    isAvailable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isAvailable'
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isActive'
    }
})

module.exports = Estado
