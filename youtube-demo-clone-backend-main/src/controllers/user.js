const { ClientError } = require('../utils/error.js')

//users route

const GET = (req, res, next) => {
    try {
        const { userId } = req.params
        const { page = req.PAGINATION.page, limit = req.PAGINATION.limit } = req.query

        let users = req.readFile('users')
        users = users.map(user => {
            delete user.password
            user.userCreatedAt = new Date().toDateString().slice(0, 10)
            return user
        })

        if (userId) {
            const user = users.find(user => user.userId == userId)
            return res.json(user)
        } else {
            const paginatedUsers = users.slice(page * limit - limit, limit * page)
            return res.json(paginatedUsers)
        }

    } catch (error) {
        return next(error)
    }
}


module.exports = {
    GET
}