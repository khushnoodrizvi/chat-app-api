require('dotenv').config()
const vars = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    API_END_POINT: process.env.API_END_POINT
}

module.exports = vars;