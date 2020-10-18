const jwt = require('jsonwebtoken')

const isAuth = (req, res ,next) => {
    try {
        const { token } = req.headers;
        if (token) {
            jwt.verify(token, process.env.SECRET);
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
