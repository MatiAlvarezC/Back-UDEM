module.exports = (req, res, next) => {
    try {
        let fs = require('fs');
        let dir = process.env.FILEPATH;
        let dir2 = process.env.FILEPDFPATH;
        if (!fs.existsSync(dir)) {
            /** Asegurarse que se tengan permisos de lectura y escritura **/
            fs.mkdirSync(dir);
        }

        if (!fs.existsSync(dir2)) {
            /** Asegurarse que se tengan permisos de lectura y escritura **/
            fs.mkdirSync(dir2);
        }
        next()

    } catch (e) {
        return res.status(e.code || 500).send({status: e.status || 'ERROR', message: e.message})
    }
}
