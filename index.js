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
          name: "title",
          message: "Enter the name of the role"
        },
        {
          name: "salary",
          message: "Enter the salary of the role"
        },
        {
          type: "list",
          name: "department_id",
          message: "Select the department the role belongs to",
          choices: departments
        }
      ])
        .then(role => {
          db.createRole(role)
            .then(() => console.log(`${role.title} role added to database!`))
            .then(() => init())
        })
    })
}

function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "Enter the employee's first name"
    },
    {
      name: "last_name",
      message: "Enter the employee's last name"
    }
  ])
    .then(res => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.findAllRoles()
        .then(([rows]) => {
          const roles = rows.map(({ id, title }) => ({
            name: title,
            value: id
          }));

          prompt({
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roles
          })
            .then(res => {
              let roleId = res.roleId;

              db.findAllEmployees()
                .then(([rows]) => {
                  let employees = rows;
                  const managers = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                  }));

                  managers.unshift({ name: "None", value: null });

                  prompt({
                    type: "list",
                    name: "managerId",
                    message: "Select the employee's manager",
                    choices: managers
                  })
                    .then(res => {
                      let employee = {
                        manager_id: res.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }

                      db.createEmployee(employee);
                    })
                    .then(() => console.log(
                      `${firstName} ${lastName} added to database!`
                    ))
                    .then(() => init())
                })
            })
        })
    })
}