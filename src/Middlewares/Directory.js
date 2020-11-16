module.exports = (req, res, next) => {
    try {
        let fs = require('fs');
        let dir = process.env.FILEPATH;
        if (!fs.existsSync(dir)) {
            /** Asegurarse que se tengan permisos de lectura y escritura **/
            fs.mkdirSync(dir);
        }
        next()

    } catch (e) {
        return res.status(e.code || 500).send({status: e.status || 'ERROR', message: e.message})
    }
}
