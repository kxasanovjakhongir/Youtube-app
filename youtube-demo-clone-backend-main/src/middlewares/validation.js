const { ClientError } = require('../utils/error.js')
const Joi = require('joi')

//validation

const userValidation = Joi.object({
    username: Joi.string().max(30).alphanum().required(),
    password: Joi.string().min(5).max(15).pattern(new RegExp(/(?=.*[A-Za-z]+)(?=.*[0-9]+)(?=.*[@$!%*#?&]+)/)).required()
})


const regValidation = (req, res, next) => {
    const { value, error } = userValidation.validate(req.body)

    if (error) return next(new ClientError(400, error))

    return next()
}


module.exports = {
    regValidation
}