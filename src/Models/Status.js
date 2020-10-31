const DB = require("../Database/Connection")
const Sequelize = require('sequelize')

const Status = DB.define('status', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
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

module.exports = Status
