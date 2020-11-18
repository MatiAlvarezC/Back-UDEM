const DB = require("../Database/Connection")
const Sequelize = require('sequelize')

const Comment = DB.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    }},
    
    {timestamps: true}
)

module.exports = Comment
