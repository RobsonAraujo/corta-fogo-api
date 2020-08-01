
const config = require('../config/dbConnectionConfig');
exports.knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: config.DB_HOST,
        database: config.DB_NAME,
        user: config.DB_USER,
        password: config.DB_PASSWORD
    }
})

