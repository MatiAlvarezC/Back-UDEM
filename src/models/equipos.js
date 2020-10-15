module.exports = (db, Sequelize) => {
    return db.define('Equipos',{
        id_equipo: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
};
