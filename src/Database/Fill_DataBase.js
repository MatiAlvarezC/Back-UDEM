const Campus = require("../Models/Campus");
const Program = require("../Models/Program");
const Status = require("../Models/Status");
const Sport = require("../Models/Sport")
const Comment_Type = require("../Models/Comment_Type")

/**
 * ESTE ARCHIVO Y SCRIPT SE USARÁ SOLO EN FASE DE DESARROLLO.
 *
 * Este archivo tiene su propio script en package.json llamado "fill".
 *
 * Si no hay tablas generadas previamente, este script lanzará un error. Si no existe tablas se debe correr el script
 * "sync" previamente.
 *
 * Su función es una vez generadas las tablas, llenarlas con información temporal, de esta manera no estar
 * rellenando tablas básicas manualmente.
 */

let Active = true

let campus = ["Providencia", "El Llano", "Talca", "Temuco"]
campus.forEach(campusName => {
    Campus.create({name: campusName, isActive: Active})
})

let program = ["Ingeniería Civil Informatica", "Ingeniería Civil Industrial", "Ingeniería Civil Química", "Ingeniería Civil Mecánica", "Ingeniería Civil Electrónica"]
program.forEach(programName => {
    Program.create({name: programName, isActive: Active})
})

let status = ["Disponible", "Expulsado", "Lesionado", "Intercambio", "Graduado", "Baja Administrativa"]
let isAvailable = [true, false, false, false, false, false]
let x = 0
status.forEach(statusName => {
    Status.create({name: statusName, isAvailable: isAvailable[x], isActive: Active})
    x++
})

let sports = ["Futbol", "Tenis", "Rugby", "Volleyball", "Sumo", "Futbol Rapido", "Basketball"]
sports.forEach(sport => {
    Sport.create({name: sport, isActive: Active})
})

let commentTypes = ["Positivo", "Negativo", "Neutral"]
commentTypes.forEach(commentType => {
    Comment_Type.create({name: commentType})
})
