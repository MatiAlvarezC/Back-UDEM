module.exports = (db, Sequelize) => {
    return db.define('ENTRENADORES',{
        id_entrenador: {
            type: Sequelize.TINYINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombres_entrenador: {
            type: Sequelize.CHAR(50),
            allowNull: false
        },
        apellido_paterno_entrenador: {
            type: Sequelize.CHAR(30),
            allowNull: false
        },
        apellido_materno_entrenador: {
            type: Sequelize.CHAR(30),
            allowNull: false
        },
        fecha_nacimiento_entrenador: {
            type: Sequelize.DATE,
            allowNull: false
        },
    });
};