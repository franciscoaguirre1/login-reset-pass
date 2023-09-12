const mysql = require("mysql");

const dbConfig = require('../db-config/db-config')

const pool = mysql.createPool(dbConfig);
const connection = () => {
    console.log(`CONECTED TO: ${dbConfig.host}!!!!!!!!!`, );
    return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
    if (err) reject(err);
    const query = (sql, binding) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, binding, (err, result) => {
            if (err) reject(err);
            resolve(result);
            });
            });
        };
        const release = () => {
            return new Promise((resolve, reject) => {
            if (err) reject(err);
            resolve(connection.release());
            });
        };
        resolve({ query, release });
        });
    });
    };
const query = (sql, binding) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, binding, (err, result, fields) => {
        if (err) reject(err);
        resolve(result);
        });
    });
};
module.exports = { pool, connection, query };