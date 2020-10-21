const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET);
            next();
        } else {
            throw {
                code: 403,
                status: 'ACCESO_DENEGADO',
                message: 'Token del encabezado faltante'
            };
        }
    } catch(e) {
        res
            .status(e.code || 500)
            .send({ status: e.status || 'ERROR', message: e.message })
    }
}

module.exports = { isAuth };
