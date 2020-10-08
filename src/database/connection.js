const { Sequelize }  = require('sequelize');


const db = new Sequelize('EXPEDIENTE', 'sa', 'password', {
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

db.authenticate().then(() => { 
  console.log('Connection has been established successfully.');
}).catch(err => console.error('Unable to connect to the databes:', err));
