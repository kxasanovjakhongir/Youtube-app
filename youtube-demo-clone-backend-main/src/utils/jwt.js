const { ClientError, ServerError } = require('../utils/error.js')
const { TOKEN_TIME } = require('../../config.js')
const jwt = require('jsonwebtoken')

//jwt for render token

module.exports = {
    sign: (payload) => {
        try {
            return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: TOKEN_TIME })
        } catch (error) {
            throw new ServerError(error.message)
        }
    },
    verify: (token) => {
        try {
            return jwt.verify(token, process.env.SECRET_KEY)
        } catch (error) {
            throw new ClientError(401, error.message)
        }
    }
}