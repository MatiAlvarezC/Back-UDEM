module.exports = (db, Sequelize) => {
    return db.define('Deportes',{
        id_deporte: {
            type: Sequelize.TINYINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_deporte: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        habilitado_deporte: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
};
