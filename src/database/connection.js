const {Sequelize} = require('sequelize');
const dotenv = require('dotenv')
dotenv.config();

const DB = new Sequelize(process.env.BBDD, process.env.USUARIOBBDD, process.env.PASSWORDBBDD, {
    dialect: 'mssql',
    host: process.env.HOST,
    port: process.env.HOST_PORT,
    define: {
        timestamps: false,            /** Desactiva la creación de atributos/columnas createdAt y updatedAt en las tablas **/
        freezeTableName: true,        /** Desactiva la creación de tablas en plural **/
        underscored: true,            /** Desactiva la creación de atributos/columnas en camelcase **/
        defaultScope: {
            attributes: {
                exclude: ['password'] /** Previene mostrar el atributo password en las queries **/
            }
        }
    },
    pool: {             /** El pool controla la cantidad de conexiones que el ORM es capaz de generar hacia la base de datos **/
        max: 5,         /** Define que nunca hayan más de 5 conexiones abiertas o activas del ORM hacia la database **/
        min: 0,         /** Define que puedan haber 0 conexiones abiertas o activas del ORM hacia la database **/
        acquire: 30000, /** Define el maximo de milisegundos que se va intentar realizar una conexión. En caso de sobrepasar el tiempo arroja timeout **/
        idle: 10000     /** Define el tiempo necesario de IDLE, es decir, si una conexión está 10000 milisegundos sin uso, esta se cerrará o desactivara **/
    },
});

DB.authenticate()       /** Esta función verifica la conexión con la base de datos. En caso de conectar, arroja mensaje de aprobado, en caso contrario muestra el error **/
    .then(() => {
        console.log('Connection successful')
    })
    .catch((error) => {
        console.log('Connection error', error.message)
    })

/*DB.sync({force: true})
    .then(() => {
        console.log("All models were synchronized successfully.")
    })*/

module.exports = DB;
