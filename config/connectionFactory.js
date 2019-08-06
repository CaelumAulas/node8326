require('dotenv').config();
const mysql = require('mysql');

function createConnection(){

  return mysql.createConnection({
    database: 'casadocodigo',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  })

}

module.exports = () => createConnection