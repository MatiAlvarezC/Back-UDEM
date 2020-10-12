module.exports = (db, Sequelize) => {
    return db.define('Equipos',{
        id_equipo: {
            type: Sequelize.TINYINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_equipo: {
            type: Sequelize.STRING(20),
            allowNull: false
        }
    });
};
