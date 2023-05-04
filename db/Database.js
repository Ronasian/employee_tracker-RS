const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employees"
});

class Database {
    constructor(db) {
        this.db = db;
    }
};

module.exports = new Database(db);