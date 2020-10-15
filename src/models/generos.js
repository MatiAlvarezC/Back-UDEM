module.exports = (db, Sequelize) => {
    return db.define('Generos',{
        id_genero: {
            type: Sequelize.TINYINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre: {
            type: Sequelize.STRING(30),
            allowNull: false
        }
    });
};
