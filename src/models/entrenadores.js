module.exports = (db, Sequelize) => {
    return db.define('Entrenadores',{
        id_entrenador: {
            type: Sequelize.STRING(11),
            primaryKey: true,
            allowNull: false
        },
        nombres_entrenador: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        apellido_paterno_entrenador: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        apellido_materno_entrenador: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        fecha_nacimiento_entrenador: {
            type: Sequelize.DATE
        },
        celular_entrenador: {
            type: Sequelize.STRING(11),
            allowNull: false
        },
        correo_entrenador: {
            type: Sequelize.STRING(50),
            allowNull:false
        }
    });
};