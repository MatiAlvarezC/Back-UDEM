const DB = require("../Database/Connection")
const Sequelize = require('sequelize')

const Sport = DB.define('sport', {
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
    src: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "default.svg"
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isActive'
    }
})

module.exports = Sport
