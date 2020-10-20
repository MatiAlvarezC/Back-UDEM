const jwt = require('jsonwebtoken')

const isAdmin = (req, res, next) => {
    try {
        const data = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET);
        if (!data.isAdmin) {
            throw {
                code: 403,
                status: 'ACCESO_DENEGADO',
                message: 'Rol invalido'
            }
        }
        next();
    } catch(e) {
        res
            .status(e.code || 500)
            .send({ status: e.status || 'ERROR', message: e.message })
    }
}

module.exports = { isAdmin };
