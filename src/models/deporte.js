const { Sequelize } = require("../database/connection")

const sequelize = require('sequelize');
const db = require('../database/connection');

const Deporte = db.define('deporte',{
    id_deporte: {
        type: sequelize.TINYINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_deporte: {
        type: sequelize.STRING(30)
    }
});

module.exports = Deporte;