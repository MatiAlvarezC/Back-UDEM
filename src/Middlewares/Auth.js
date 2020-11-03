const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET);
            next();
        } else {
            return res.sendStatus()
        }
    } catch(e) {
        return res.status(e.code || 500).send({ status: e.status || 'ERROR', message: e.message })
    }
}