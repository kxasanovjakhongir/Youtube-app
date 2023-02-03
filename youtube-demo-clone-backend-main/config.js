const fs = require('fs')
require('dotenv').config()

fs.writeFileSync('.env', 'SECRET_KEY=' + "olmacha")

const PORT = process.env.PORT || 1515

const TOKEN_TIME = 60 * 60 * 24

const PAGINATION = {
    page: 1,
    limit: 100
}

module.exports = {
    TOKEN_TIME,
    PAGINATION,
    PORT
}