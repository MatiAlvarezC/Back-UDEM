module.exports = (db, Sequelize) => {
    return db.define('Deportistas',{
        matricula: {
            type: Sequelize.STRING(20),
            primaryKey: true,
            allowNull: false
        },
        nombres_deportista: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        apellido_paterno_deportista: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        apellido_materno_deportista: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        fecha_nacimiento_deportista: {
            type: Sequelize.DATEONLY
        },
        fecha_inicio_programa: {
            type: Sequelize.DATEONLY
        },
        altura_cm: {
            type: Sequelize.FLOAT
        },
        peso_kg: {
            type: Sequelize.FLOAT
        },
        posicion: {
            type: Sequelize.STRING(20)
        },
        numero: {
            type: Sequelize.TINYINT,
            unique: true
        },
        celular_deportista: {
            type: Sequelize.STRING(11),
            allowNull: false
        },
        correo_deportista: {
            type: Sequelize.STRING(50),
            allowNull:false
        },
        habilitado_deportista: {
            type: Sequelize.BOOLEAN,
            allowNull: false
    });
};