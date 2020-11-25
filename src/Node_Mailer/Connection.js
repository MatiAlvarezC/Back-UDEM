const nodemailer = require("nodemailer");

/**
 *  Esta función establece la conexión con el servidor o la cuenta desde la cual se enviarán los correos. En caso de tener
 *  un host o dominio de correo se debe usar de la siguiente manera:
 *      host: 'domain_here',
 *      port: port_here,
 *      auth: {
 *         user: 'put_your_username_here',
 *         pass: 'put_your_password_here'
 *      }
 *  En caso de tener una cuenta única desde la cual se enviaran los correos se debe usar de la siguiente manera:
 *      service: 'service_here|gmail|outlook|etc',
 *      auth: {
 *          user: 'username_here',
 *          pass: 'password_here'
 *      }
 *
 */

const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'ddf96f2b542949',
        pass: '10636f20fa3fb4'
    }
})

module.exports = transport