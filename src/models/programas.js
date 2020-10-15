module.exports = (db, Sequelize) => {
    return db.define('Programa',{
        id_programa: {
            type: Sequelize.TINYINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        duracion_semestres: {
            type: Sequelize.TINYINT
        }
    });
};
