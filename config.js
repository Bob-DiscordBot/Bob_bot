require('dotenv').config();

module.exports = {
    BOT_token: process.env.BOT_TOKEN,
    BOT_client: process.env.BOT_CLIENT,
    BOT_secret: process.env.BOT_SECRET,

    DBD_licence: process.env.DBD_LICENCE,
    DBD_port: 8080,

    DB_token: process.env.BD_TOKEN,

    /*
    DB_host: process.env.DB_HOST,
    DB_user: process.env.DB_USER,
    DB_pass: process.env.DB_PASS,
    DB_name: process.env.DB_NAME,
    /**/
}
