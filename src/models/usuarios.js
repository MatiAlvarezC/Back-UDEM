module.exports = (db, Sequelize) => {
    return db.define('Entrenadores', {
        nomina: {
            type: Sequelize.STRING(20),
            primaryKey: true,
            allowNull: false
        },
        nombres: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        apellido_paterno: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        apellido_materno: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        celular: {
            type: Sequelize.STRING(11),
            allowNull: false
        },
        correo: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        talla_camisa: {
            type: Sequelize.STRING(3)
        },
        talla_short: {
            type: Sequelize.STRING(3)
        },
        puesto: {
            type: Sequelize.STRING(20)
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false

        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
            allowNull: false

        }
    });
};








