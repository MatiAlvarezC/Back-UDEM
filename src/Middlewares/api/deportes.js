const { check, validationResult } = require('express-validator');

exports.deporteValidator = async (req) => {
    [check('nombre_deporte', 'El nombre del deporte es un campo obligatorio')]
}