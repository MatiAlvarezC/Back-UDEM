const Sequelize = require('sequelize');
const db = require('./connection');
const DeporteModel = require('../models/deporte');

const Deporte = DeporteModel(db, Sequelize);

db.sync({ force: true })
    .then(() => {
        console.log('Tablas sincronizadas');
    });

module.exports = { 
    Deporte
};