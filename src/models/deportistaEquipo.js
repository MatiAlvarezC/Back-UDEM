const { Deporte, Deportista } = require("../database/database");

module.exports = (db, Sequelize) => {
    return db.define('DeportistaEquipo',{
        id_deporte: {
            type: Sequelize.TINYINT,
            references: {
                model: Deporte,
                key: 'id_deporte'
            }
        },
        id_deportista: {
            type: Sequelize.STRING(30),
            references: {
                model: Deportista,
                key: 'id_deportista'
            }
        }
    });
};