const { PAGINATION } = require('../../config.js')

module.exports = (req, res, next) => {
	req.PAGINATION = PAGINATION
	return next()
}