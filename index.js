const { prompt } = require("inquirer");
const db = require('./db/Database');

function init() {
  prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose an option",
        choices: [
          {
            name: "View all departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "View all roles",
            value: "VIEW_ROLES"
          },
          {
            name: "View all employees",
            value: "VIEW_EMPLOYEES"
          },
          {
            name: "Add department",
            value: "ADD_DEPARTMENT"
          },
          {
            name: "Add role",
            value: "ADD_ROLE"
          },
          {
            name: "Add employee",
            value: "ADD_EMPLOYEE"
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE"
          }
        ]
      }
  ]).then(res => {
    let choice = res.choice;
    if (choice === "VIEW_DEPARTMENTS") {
        viewDepartments();
    } else if (choice === "VIEW_ROLES") {
        viewRoles();
    } else if (choice === "VIEW_EMPLOYEES") {
        viewEmployees();
    } else if (choice === "ADD_DEPARTMENT") {
        addDepartment();
    } else if (choice === "ADD_ROLE") {
        addRole();
    } else if (choice === "ADD_EMPLOYEE") {
        addEmployee();
    } else {
        updateEmployeeRole();
    }
  })
}