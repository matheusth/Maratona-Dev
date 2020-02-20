const env = require('process').env;
const Pool = require('pg').Pool;
const db = new Pool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    port: env.DB_PORT,
});
module.exports = db;