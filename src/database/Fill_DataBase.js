const Tipo_Sangre = require("../models/Tipo_Sangre");
const Campus = require("../models/Campus");
const Programa = require("../models/Programa");
const Estado = require("../models/Estado");
const Deporte = require("../models/Deporte");
const Genero = require("../models/Genero");

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

let Status = true

let sangre = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"]
sangre.forEach(blood => {
    Tipo_Sangre.create({nombre: blood})
})
let campus = ["Providencia", "El Llano", "Talca", "Temuco"]
campus.forEach(camp => {
    Campus.create({nombre: camp, isActive: Status})
})
let programa = ["Ingeniería Civil Informatica", "Ingeniería Civil Industrial", "Ingeniería Civil Química", "Ingeniería Civil Mecánica", "Ingeniería Civil Electrónica"]
programa.forEach(program => {
    Programa.create({nombre: program, isActive: Status})
})
let estado = ["Disponible", "Expulsado", "Lesionado", "Intercambio", "Graduado", "Baja Administrativa"]
let isAvailable = [true, false, false, false, false, false]
let x = 0
estado.forEach(status => {
    Estado.create({nombre: status, isAvailable: isAvailable[x], isActive: Status})
    x++
})
let deportes = ["Futbol", "Tenis", "Rugby", "Volleyball", "Sumo", "Futbol Rapido", "Basketball"]
let isActive = true
deportes.forEach(sport => {
    Deporte.create({nombre: sport, isActive})
})
let genero = ["Masculino", "Femenino", "Mixto", "Funao", "Apache", "Jedi", "M1 Abrams"]
genero.forEach(gen => {
    Genero.create({nombre: gen})
})

