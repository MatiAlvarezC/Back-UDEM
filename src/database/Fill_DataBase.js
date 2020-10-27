const Campus = require("../models/Campus");
const Programa = require("../models/Programa");
const Estado = require("../models/Estado");

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

