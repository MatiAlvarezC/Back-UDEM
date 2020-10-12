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
const DeportistaEquipo = db.define('DeportistaEquipo',{
});
const Estado = EstadoModel(db, Sequelize);
const Campus = CampusModel(db, Sequelize);
const Programa = ProgramaModel(db, Sequelize);


Deporte.hasMany(Equipo);
Equipo.belongsTo(Deporte);

Entrenador.hasMany(Equipo);
Equipo.belongsTo(Entrenador);

Genero.hasMany(Equipo);
Equipo.belongsTo(Genero);

Deportista.belongsToMany(Equipo, { through: DeportistaEquipo });
Equipo.belongsToMany(Deportista, { through: DeportistaEquipo });

Estado.hasMany(DeportistaEquipo);
DeportistaEquipo.belongsTo(Estado);

Campus.hasMany(Deportista);
Deportista.belongsTo(Campus);

Programa.hasMany(Deportista);
Deportista.belongsTo(Programa);


db.sync({ force: false })
    .then(() => {
        console.log('Tablas sincronizadas');
    });
