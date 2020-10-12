module.exports = (db, Sequelize) => {
    return db.define('Programa',{
        id_programa: {
            type: Sequelize.TINYINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_programa: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        duracion_semestres: {
            type: Sequelize.TINYINT
        }
    });
};
