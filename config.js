require('dotenv').config();

module.exports = {
    token: process.env.BOT_TOKEN,
    DB_host: process.env.DB_HOST,
    DB_user: process.env.DB_USER,
    DB_pass: process.env.DB_PASS,
    DB_name: process.env.DB_NAME,
}
