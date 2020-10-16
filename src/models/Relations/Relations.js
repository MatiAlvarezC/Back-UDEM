const Deportista = require("../Deportista")
const Datos_Medicos = require("../Datos_Medicos")
const Programa = require("../Programa")
const Campus = require("../Campus")
const Deportista_en_Equipo = require("../Deportista_en_Equipo")
const Estado = require("../Estado")
const Tipo_Sangre = require("../Tipo_Sangre")
const Equipo = require("../Equipo")
const Deporte = require("../Deporte")
const Genero = require("../Genero")
const Usuario_en_Equipo = require("../Usuario_en_Equipo")
const Usuario = require("../Usuario")

Estado.hasMany(Deportista, {foreignKey: {allowNull: false}})
Deportista.belongsTo(Estado)

Programa.hasMany(Deportista, {foreignKey: {allowNull: false}})
Deportista.belongsTo(Programa)

Campus.hasMany(Deportista, {foreignKey: {allowNull: false}})
Deportista.belongsTo(Campus)

Datos_Medicos.hasOne(Deportista, {foreignKey: {allowNull: false}})
Deportista.belongsTo(Datos_Medicos)

Tipo_Sangre.hasMany(Datos_Medicos, {foreignKey: {allowNull: false}})
Datos_Medicos.belongsTo(Tipo_Sangre)

Deporte.hasMany(Equipo, {foreignKey: {allowNull: false}})
Equipo.belongsTo(Deporte)

Genero.hasMany(Equipo, {foreignKey: {allowNull: false}})
Equipo.belongsTo(Genero)

Equipo.belongsToMany(Deportista, {through: Deportista_en_Equipo})
Deportista.belongsToMany(Equipo, {through: Deportista_en_Equipo})

Equipo.belongsToMany(Usuario, {through: Usuario_en_Equipo})
Usuario.belongsToMany(Equipo, {through: Usuario_en_Equipo})

