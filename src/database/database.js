const Sequelize = require('sequelize');
const db = require('./connection');
const DeporteModel = require('../models/deportes');
const EquipoModel = require('../models/equipos');
const EntrenadorModel = require('../models/entrenadores');
const GeneroModel = require('../models/generos');
const DeportistaModel = require('../models/deportistas');
const EstadoModel = require('../models/estados');
const CampusModel = require('../models/campus');
const ProgramaModel = require('../models/programas');


db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => console.error('Unable to connect to the databes:', err));


const Deporte = DeporteModel(db, Sequelize);
const Equipo = EquipoModel(db, Sequelize);
const Entrenador = EntrenadorModel(db, Sequelize);
const Genero = GeneroModel(db, Sequelize);
const Deportista = DeportistaModel(db, Sequelize);
const DeportistaEquipo = db.define('DeportistaEquipo', {
    fecha_inicio: {
        type: Sequelize.DATEONLY
    },
    fecha_salida: {
        type: Sequelize.DATEONLY
    }
});
const Estado = EstadoModel(db, Sequelize);
const Campus = CampusModel(db, Sequelize);
const Programa = ProgramaModel(db, Sequelize);


Deporte.hasMany(Equipo, {foreignKey: {name: 'DeporteIdDeporte', allowNull: false}});
Equipo.belongsTo(Deporte);

Entrenador.hasMany(Equipo, {foreignKey: {name: 'EntrenadoreIdEntrenador', allowNull: false}});
Equipo.belongsTo(Entrenador);

Genero.hasMany(Equipo, {foreignKey: {name: 'GeneroIdGenero', allowNull: false}});
Equipo.belongsTo(Genero);

Deportista.belongsToMany(Equipo, {through: DeportistaEquipo});
Equipo.belongsToMany(Deportista, {through: DeportistaEquipo});

Estado.hasMany(DeportistaEquipo, {foreignKey: {name: 'EstadoIdEstado', allowNull: false}});
DeportistaEquipo.belongsTo(Estado);

Campus.hasMany(Deportista, {foreignKey: {name: 'CampusIdCampus', allowNull: false}});
Deportista.belongsTo(Campus);

Programa.hasMany(Deportista, {foreignKey: {name: 'ProgramaIdPrograma', allowNull: false}});
Deportista.belongsTo(Programa);


module.exports = {
    Deporte,
    Equipo,
    Entrenador,
    Genero,
    Deportista,
    DeportistaEquipo,
    Estado,
    Campus,
    Programa
};
