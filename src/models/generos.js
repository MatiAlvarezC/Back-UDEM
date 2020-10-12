module.exports = (db, Sequelize) => {
    return db.define('Generos',{
        id_genero: {
            type: Sequelize.TINYINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_genero: {
            type: Sequelize.STRING(20),
            allowNull: false
        }
    });
};
