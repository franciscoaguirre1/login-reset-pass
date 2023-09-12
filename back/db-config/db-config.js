require('dotenv').config()
const fs = require('fs')

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))

const dbConfig = {
    connectionLimit: 300, // default 10
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DB_NAME,
    charset : 'utf8mb4'
};

module.exports = dbConfig;