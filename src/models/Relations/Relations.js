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

/**
 * Las foreign keys se declaran con allowNull para tener concordancia con lo especificado en los modelos
 * También se declara un name, ya que de lo contrario las foreign key se declaran en camelCase
 */

Estado.hasMany(Deportista, {foreignKey: {allowNull: false, name: 'estado_id'}})
Deportista.belongsTo(Estado, {foreignKey: {name: 'estado_id'}})

Programa.hasMany(Deportista, {foreignKey: {allowNull: false, name: 'programa_id'}})
Deportista.belongsTo(Programa, {foreignKey: {name: 'programa_id'}})

Campus.hasMany(Deportista, {foreignKey: {allowNull: false, name: 'campus_id'}})
Deportista.belongsTo(Campus, {foreignKey: {name: 'campus_id'}})

Datos_Medicos.hasOne(Deportista, {foreignKey: {allowNull: false, name: 'datos_medicos_numero_poliza'}})
Deportista.belongsTo(Datos_Medicos, {foreignKey: {name: 'datos_medicos_numero_poliza'}})

Tipo_Sangre.hasMany(Datos_Medicos, {foreignKey: {allowNull: false, name: 'tipo_sangre_id'}})
Datos_Medicos.belongsTo(Tipo_Sangre, {foreignKey: {name: 'tipo_sangre_id'}})

Deporte.hasMany(Equipo, {foreignKey: {allowNull: false, name: 'deporte_id'}})
Equipo.belongsTo(Deporte, {foreignKey: {name: 'deporte_id'}})

Genero.hasMany(Equipo, {foreignKey: {allowNull: false, name: 'genero_id'}})
Equipo.belongsTo(Genero, {foreignKey: {name: 'genero_id'}})

Equipo.belongsToMany(Deportista, {through: Deportista_en_Equipo, foreignKey: {name: 'equipo_id'}})
Deportista.belongsToMany(Equipo, {through: Deportista_en_Equipo, foreignKey: {name: 'deportista_matricula'}})

Equipo.belongsToMany(Usuario, {through: Usuario_en_Equipo, foreignKey: {name: 'equipo_id'}})
Usuario.belongsToMany(Equipo, {through: Usuario_en_Equipo, foreignKey: {name: 'usuario_nomina'}})

