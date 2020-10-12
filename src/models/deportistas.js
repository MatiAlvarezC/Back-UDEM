module.exports = (db, Sequelize) => {
    return db.define('Deportistas',{
        id_deportista: {
            type: Sequelize.STRING(30),
            primaryKey: true,
            allowNull: false
        },
        nombres_deportistas: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    });
};