const transport = require("../Node_Mailer/Connection")

const sendEmail = async (req, res) => {
    const token = "h435jk6h45jk6h54jk6hjk456h4k.4j5h34"
    const message = {
        from: 'elonmusk@tesla.com', // Sender address
        to: 'm.gutierrez.tolorza@gmail.com',         // List of recipients
        subject: 'Asunto', // Subject line
        html: '<div style="display: flex; justify-content: center">' +
            '<div style="background: #FBEE23; width: 500px; height: 800px;font-family: Roboto; text-align: center">' +
            '<h1>Expediente deportivo UDEM</h1>' +
            '<p>Hemos recibido una solicitud de restablecimiento de contraseña.</p>' +
            '<p>Para restablecer su contraseña ingrese al siguiente <a href="algunaweairaca">enlace</a>.</p>' +
            '<p><a href="http://localhost:3000/'+token+'" id="token">http://localhost:3000/'+token+'</a></p>' +
            '<p>Este enlace tiene una duración de una hora.</p>' +
            '<p>En caso de no haber solicitado este restablecimiento ignore este correo</p>' +
            '</div>' +
            '</div>'
    };

    await transport.sendMail(message, (e, info) => {
        if (e) {
            console.log(e)
        } else {
            console.log(info)
        }
    })

    return res.send("mensaje enviado")
}

const test = async (req, res) => {
    return res.send("test webhook 9")
}

module.exports = {
    sendEmail,
    test
}