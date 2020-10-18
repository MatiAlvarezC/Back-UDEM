const DB = require("../database/connection")
const Sequelize = require('sequelize')

const Deporte = DB.define('deporte', {
    id: {
        type: Sequelize.TINYINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    src: {
        type: Sequelize.STRING(255),
        allowNull: false,
        defaultValue: "default.svg"
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isActive'
    }
})

module.exports = Deporte
