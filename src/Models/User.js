const DB = require("../Database/Connection")
const Sequelize = require('sequelize')

const User = DB.define('user', {
    payrollNumber: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paternalLastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    maternalLastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shirtSize: {
        type: Sequelize.STRING,
        allowNull: true
    },
    shortSize: {
        type: Sequelize.STRING,
        allowNull: true
    },
    occupation: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isActive'
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isAdmin'
    },
    failedLoginAttempts: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    failedLoginTime: {
        type: Sequelize.DATE,
        allowNull: true
    }
})

module.exports = User
