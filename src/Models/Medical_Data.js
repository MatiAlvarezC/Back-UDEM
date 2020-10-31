const DB = require("../Database/Connection")
const Sequelize = require('sequelize')

const Medical_Data = DB.define('medicalData', {
    policyNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    policyValidity: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    insurancePhone: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    insuranceConditions: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    emergencyContactName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    emergencyContactPhone: {
        type: Sequelize.BIGINT,
        allowNull: true
    },
    diseases: {
        type: Sequelize.STRING,
        allowNull: true
    },
    medications: {
        type: Sequelize.STRING,
        allowNull: true
    },
    surgeries: {
        type: Sequelize.STRING,
        allowNull: true
    },
    bloodType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    src: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Medical_Data
