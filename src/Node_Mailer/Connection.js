const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    /*service: 'gmail',
    auth: {
        user: 'test.node.mailer.ctm@gmail.com',
        pass: 'auto2020'
    }*/
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'ddf96f2b542949',
        pass: '10636f20fa3fb4'
    }
})

module.exports = transport