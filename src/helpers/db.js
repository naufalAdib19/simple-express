require("dotenv").config({
  path: "../../.env",
});
const mysql = require("mysql2/promise");

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

const conn = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
});

module.exports = conn;
