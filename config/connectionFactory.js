require('dotenv').config();
const mysql = require('mysql');

function createConnection(){
  return mysql.createConnection({
    database: 'casadocodigo',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 3306
  })

}

module.exports = () => createConnection