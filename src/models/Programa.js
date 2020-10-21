const DB = require("../database/connection")
const Sequelize = require('sequelize')

const Programa = DB.define('programa', {
    id: {
        type: Sequelize.TINYINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isActive'
    }
})

module.exports = Programa
