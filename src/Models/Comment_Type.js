const DB = require("../Database/Connection")
const Sequelize = require('sequelize')

const Comment_Type = DB.define('commentType', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Comment_Type
