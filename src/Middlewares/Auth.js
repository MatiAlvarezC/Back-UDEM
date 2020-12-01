const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            return res.sendStatus(401)
        }

        const parts = authorization.split(" ")
        if (parts.length !== 2) {
            return res.sendStatus(401)
        }

        if (parts[0] !== "Bearer") {
            return res.sendStatus(401)
        }

        const token = parts[1]

        jwt.verify(token, process.env.SECRET)

        next();
    } catch (e) {
        return res.sendStatus(500)
    }
}
