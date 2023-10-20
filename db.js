const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "changeme",
  database: "cherry_crud",
});

conn.connect();

module.exports = conn;
