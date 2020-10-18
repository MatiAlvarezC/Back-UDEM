const DB = require("../database/connection")
const Sequelize = require('sequelize')

const Genero = DB.define('genero', {
    id: {
        type: Sequelize.TINYINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING(30),
        allowNull: false
    }
})

module.exports = Genero
