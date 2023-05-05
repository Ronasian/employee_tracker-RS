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

    findAllDepartments() {
        return this.db.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }

    findAllRoles() {
        return this.db.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    findAllEmployees() {
        return this.db.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    createDepartment(department) {
        return this.db.promise().query("INSERT INTO department SET ?", department);
    }

    createRole(role) {
        return this.db.promise().query("INSERT INTO role SET ?", role);
    }
  
    createEmployee(employee) {
        return this.db.promise().query("INSERT INTO employee SET ?", employee);
    }
  
    updateEmployeeRole(employeeId, roleId) {
        return this.db.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    }
}

module.exports = new Database(db);