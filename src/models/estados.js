module.exports = (db, Sequelize) => {
    return db.define('Estado',{
        id_estado: {
            type: Sequelize.TINYINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre_estado: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        isActive:{
            type: Sequelize.BOOLEAN,
            allowNull: false


        }
    });
};
