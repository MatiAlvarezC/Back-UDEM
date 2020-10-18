const DB = require("../database/connection")
const Sequelize = require('sequelize')

const Campus = DB.define('campus', {
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

module.exports = Campus
