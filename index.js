// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const logo = require('asciiart-logo');
const db = require('./config/connection');
const { response } = require('express');
require('console.table');

// App initialization
init();

// Run when app is initialized
function init() {
    const logoText = logo({ name: 'Employee Manager' }).render();
    console.log(logoText);

    loadPrompts();
}

function loadPrompts() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Welcome to the employee database! What would you like to do?',
                choices: ['View All Employees',
                          'View All Departments',
                          'View All Roles',
                          'Add A Department',
                          'Add A Role',
                          'Add An Employee',
                          'Update Employee Role',
                          'Quit'
                ]
            }
        ]).then(function(val) {
            switch (val.choice) {
                case 'View All Employees':
                    viewAllEmployees();
                break;

                case 'View All Departments':
                    viewDepartments();
                break;

                case 'View All Roles':
                    viewRoles();
                break;

                case 'Add A Department':
                    addDepartment();
                break;

                case 'Add A Role':
                    addRole();
                break;

                case 'Add An Employee':
                    addEmployee();
                break;

                case 'Update Employee Role':
                    updateEmployee();
                break;

                case 'Quit':
                    quit();
                break;
            }
        })
}

function viewAllEmployees() {
    db.query(`SELECT employees.id,
             employees.first_name,
             employees.last_name,
             roles.title,
             departments.name AS 'department',
             roles.salary
             FROM employees, roles, departments
             WHERE departments.id = roles.department_id
             AND roles.id = employees.role_id
             ORDER BY employees.id ASC`, 
        (err, res) => {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res);
        loadPrompts();
    })
}

function viewDepartments() {
    db.query(`SELECT departments.id AS id,
             departments.name AS department FROM departments;`, 
        (err, res) => {
        if (err) throw err;
        console.table('All Departments:', res);
        loadPrompts();
    })
}

function viewRoles() {
    db.query(`SELECT roles.id,
             roles.title,
             departments.name AS department
             FROM roles
             INNER JOIN departments ON roles.department_id = departments.id`, 
        (err, res) => {
        if (err) throw err;
        console.table('All Roles:', res);
        loadPrompts();
    })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDepartment',
                type: 'input',
                message: 'Which department would you like to add?'
            }
        ]).then(function (answer) {
            db.query('INSERT INTO departments SET ?',
            {
                name: answer.newDepartment
            });
            db.query('SELECT * FROM departments', (err, res) => {
                if (err) throw err;
                console.log('Your department has been added!');
                console.table('All Departments:', res);
                loadPrompts();
            })
        })
}

function addRole() {
    db.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: 'role',
                    type: 'input',
                    message: "What new role would you like to add?"
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'What is the salary of this role? (Please enter a number)'
                },
                {
                    name: 'department',
                    type: 'list',
                    messsage: 'What department does this role belong to?',
                    choices: function() {
                        let departments = [];
                        for (let i = 0; i < res.length; i++) {
                            departments.push(res[i].name);
                        }
                        return departments;
                    },
                }
            ]).then(function (answer) {
                for (let i = 0; i < res.length; i++) {
                    department_id = res[i].id;
                }

                db.query('INSERT INTO roles SET ?',
                {
                    title: answer.role,
                    salary: answer.salary,
                    department_id: answer.department
                },
                function (err, res) {
                    if (err) throw err;
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    loadPrompts();
                })
        })
    })
}
    
function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: "What is the employee's first name?"
            },
            {
                name: 'last_name',
                type: 'input',
                message: "What is the employee's last name?"
            },
        ]).then(answer => {
            const name = [answer.first_name, answer.last_name]
            db.query(`SELECT roles.id, roles.title FROM roles`, (err, res) => {
                if (err) throw err;
                const roles = res.map(({ id, title }) => ({ name: title, value: id }));
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: "What is the employee's role?",
                            choices: roles
                        }
                    ]) .then(roleChoice => {
                            const role = roleChoice.role;
                            name.push(role);
                            db.query(`SELECT * FROM employees`, (err, res) => {
                                if (err) throw err;
                                const managers = res.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
                                inquirer
                                    .prompt([
                                        {
                                            type: 'list',
                                            name: 'manager',
                                            message: "Who is the employee's manager?",
                                            choices: managers
                                        }
                                    ]) .then(managerChoice => {
                                            const manager = managerChoice.manager;
                                            name.push(manager);
                                            db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
                                                      VALUES (?, ?, ?, ?)`, name, 
                                                (err) => {
                                                if (err) throw err;
                                                console.log("An Employee has been added!")
                                                loadPrompts();
                                            })
                                    })
                            })
                    })
            })
        })
};

function updateEmployee() {
    db.query(`SELECT employees.id,
              employees.first_name,
              employees.last_name,
              roles.id AS "role_id"
              FROM employees, roles, departments
              WHERE departments.id = roles.department_id AND roles.id = employees.role_id`,
              (err, res) => {
                  if (err) throw err;
                  let names = [];
                  res.forEach((employee) => {names.push(`${employee.first_name} ${employee.last_name}`)});
                
                  db.query(`SELECT roles.id, roles.title FROM roles`, (err, res) => {
                      if (err) throw err;
                      let roles = [];
                      res.forEach((role) => {roles.push(role.title)});

                      inquirer
                      .prompt([
                          {
                              name: 'selectedEmployee',
                              type: 'list',
                              message: "Which employee's role would you like to change?",
                              choices: names
                          },
                          {
                              name: 'selectedRole',
                              type: 'list',
                              message: 'What is their new role?',
                              choices: roles
                          }
                      ]) .then((answer) => {
                          let newTitleId, employeeId;

                          res.forEach((role) => {
                              if (answer.role === role.title) {
                                  newTitleId = role.id;
                              }
                          })

                          res.forEach((employee) => {
                              if (answer.name === `${employee.first_name} ${employee.last_name}`) {
                                  employeeId = employee.id;
                              }
                          })

                          db.query(`UPDATE employees SET employees.role_id = ? WHERE employees.id = ?`, 
                          [newTitleId, employeeId], (err) => {
                                if (err) throw err;
                                console.log("Employee's role updated!")
                                loadPrompts();
                          })
                      })
                  })
              })
}

function quit() {
    db.end();
}