const Sequelize = require('sequelize');
const db = require('./connection');
const DeporteModel = require('../models/deportes');

db.authenticate().then(() => { 
    console.log('Connection has been established successfully.');
  }).catch(err => console.error('Unable to connect to the databes:', err));

const Deporte = DeporteModel(db, Sequelize);

module.exports = {
    Deporte
};