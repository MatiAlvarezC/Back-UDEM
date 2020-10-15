require('dotenv').config();
const {Sequelize}  = require('sequelize');


const DB = new Sequelize(process.env.BBDD, process.env.USUARIOBBDD, process.env.PASSWORDBBDD, {
  dialect: 'mssql',
  host: 'udem2.ctpkwltoxq0t.sa-east-1.rds.amazonaws.com',
  port: '5432',
  define: {
    timestamps: false,        /** Desactiva la creación de atributos/columnas createdAt y updatedAt en las tablas **/
    freezeTableName: false,   /** Desactiva la creación de tablas en plural **/
    underscored: true,        /** Desactiva la creación de atributos/columnas en camelcase **/
    defaultScope: {
      attributes: {
        exclude: ['password'] /** Previene mostrar el atributo password en las queries **/
      }
    }
  },
  pool: {           /** El pool controla la cantidad de conexiones que el ORM es capaz de generar hacia la base de datos **/
    max: 5,         /** Define que nunca hayan más de 5 conexiones abiertas o activas del ORM hacia la database **/
    min: 0,         /** Define que puedan haber 0 conexiones abiertas o activas del ORM hacia la database **/
    acquire: 30000, /** Define el maximo de milisegundos que se va intentar realizar una conexión. En caso de sobrepasar el tiempo arroja timeout **/
    idle: 10000     /** Define el tiempo necesario de IDLE, es decir, si una conexión está 10000 milisegundos sin uso, esta se cerrará o desactivara **/
  },
});

module.exports = DB;
