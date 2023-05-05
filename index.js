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

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => init());
}

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => init());
}

function viewEmployees() {
    db.findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => init());
}

function addDepartment() {
  prompt([
    {
      name: "name",
      message: "Enter the name of the department"
    }
  ])
    .then(res => {
      db.createDepartment(res)
        .then(() => console.log(`${res.name} department added to database!`))
        .then(() => init())
    })
}

function addRole() {
  db.findAllDepartments()
    .then(([rows]) => {
      const departments = rows.map(({ id, name }) => ({
        name: name,
        value: id
      }));
      prompt([
        {
          name: "name",
          message: "Enter the name of the role"
        },
        {
          name: "salary",
          message: "Enter the salary of the role"
        },
        {
          type: "list",
          name: "department",
          message: "Select the department the role belongs to",
          choices: departments
        }
      ])
        .then(role => {
          db.createRole(role)
            .then(() => console.log(`${role.name} role added to database!`))
            .then(() => init())
        })
    })
}