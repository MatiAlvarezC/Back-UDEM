const DB = require("../Database/Connection")
const Sequelize = require('sequelize')

const Team_Player = DB.define('teamPlayer', {
    startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    endDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    position: {
        type: Sequelize.STRING,
        allowNull: true
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    isCaptain: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isCaptain'
    }
})

module.exports = Team_Player
