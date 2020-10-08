const { Sequelize }  = require('sequelize');


module.exports = new Sequelize('EXPEDIENTE', 'sa', 'password', {
  dialect: 'mssql',
  host: 'localhost',
  port: '1433',
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


