require("dotenv").config({
  path: "../../.env",
});
const mysql = require("mysql");

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

const conn = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB");
});

module.exports = conn;
