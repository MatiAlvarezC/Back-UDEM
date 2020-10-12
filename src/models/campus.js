module.exports = (db, Sequelize) => {
    return db.define('Campus',{
        id_campus: {
            type: Sequelize.TINYINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_campus: {
            type: Sequelize.STRING(30),
            allowNull: false
        }
    });
};
