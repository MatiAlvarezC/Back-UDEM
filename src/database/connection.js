require('dotenv').config();

const { Sequelize }  = require('sequelize');


module.exports = new Sequelize(process.env.BBDD, process.env.USUARIOBBDD, process.env.PASSWORDBBDD, {
  dialect: 'mssql',
  host: 'udem2.ctpkwltoxq0t.sa-east-1.rds.amazonaws.com',
  port: '5432',
  config: {
    options: {
      encrypt: true,
      validateBulkLoadParameters: true,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});


