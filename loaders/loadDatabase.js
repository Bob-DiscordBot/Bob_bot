const mysql = require('mysql');
const config = require('../config');

module.exports = async () => {
    let db = await mysql.createConnection({
        host: config.DB_host,
        user: config.DB_user,
        password: config.DB_pass,
        database: config.DB_name,
    });

    return db;
}
