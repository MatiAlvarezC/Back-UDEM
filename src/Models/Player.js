const DB = require("../Database/Connection")
const Sequelize = require('sequelize')

const Player = DB.define('player', {
    registrationNumber: {
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
    birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    heightM: {
        type: Sequelize.STRING,
        allowNull: true
    },
    weightKg: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    shirtSize: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shortSize: {
        type: Sequelize.STRING,
        allowNull: false
    },
    debutYear: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'isActive'
    },
    src: {
        type: Sequelize.STRING,
        allowNull: true
    },
    fullName: {
        type: Sequelize.VIRTUAL,
        get() {
            return `${this.name} ${this.paternalLastName} ${this.maternalLastName}`;
        }
    }
})

module.exports = Player
