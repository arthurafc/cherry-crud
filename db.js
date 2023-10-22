const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "new-password",
  database: "cherry_crud",
});

conn.connect();

module.exports = conn;
