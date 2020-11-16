const nodemailer = require("nodemailer");

let transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'ddf96f2b542949',
        pass: '10636f20fa3fb4'
    }
});

module.exports = {
    transport
}