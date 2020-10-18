const DB = require("../database/connection")
const Sequelize = require('sequelize')

const Tipo_Sangre = DB.define('tipo_sangre', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(5),
        allowNull: false,
    }
})

module.exports = Tipo_Sangre
