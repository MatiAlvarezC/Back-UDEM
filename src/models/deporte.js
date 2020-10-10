module.exports = (db, Sequelize) => {
    return db.define('deporte',{
        id_deporte: {
            type: Sequelize.TINYINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_deporte: {
            type: Sequelize.CHAR(30),
            allowNull: false
        }
    });
};
