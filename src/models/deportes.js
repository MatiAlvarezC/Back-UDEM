module.exports = (db, Sequelize) => {
    return db.define('Deportes',{
        id_deporte: {
            type: Sequelize.TINYINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_deporte: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
};
