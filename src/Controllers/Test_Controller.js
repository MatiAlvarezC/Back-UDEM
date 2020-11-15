/*const transport = require('./../Node_Mailer/Connection')*/
const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
    console.log("xd")

    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'test.node.mailer.ctm@gmail.com',
            pass: 'auto2020'
        }
    });

    const message = {
        from: 'elonmusk@tesla.com', // Sender address
        to: 'correo@gmail.com',         // List of recipients
        subject: 'Asunto', // Subject line
        text: 'texto' // Plain text body
    };

    await transport.sendMail(message, (e, info) => {
        if(e){
            console.log(e)
        } else {
            console.log(info)
        }
    })

    return res.send("mensaje enviado")
}

module.exports = {
    sendEmail
}