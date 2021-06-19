const jwt = require('jsonwebtoken')
const { secret } = require('../constants')
const { error } = require('../lib/response')

function checkToken(req, res, next) {
    const token = req.headers['auth']

    try {
        jwt.verify(token, secret)
        next()
    } catch(e) {
        res.status(401).send(error("Not authorized."))
    }
}

module.exports = checkToken