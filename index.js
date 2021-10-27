// Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const logo = require('asciiart-logo');
const db = require('./config/connection');
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
    db.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res);
        loadPrompts();
    })
}

function viewDepartments() {
    db.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;
        console.table('All Departments:', res);
        loadPrompts();
    })
}

function viewRoles() {
    db.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.table(('All Roles:'), res);
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
                    choices: function() {
                        let departments = [];
                        for (let i = 0; i < res.length; i++) {
                            departments.push(res[i].name);
                        }
                        return departments;
                    },
                }
            ]).then(function (answer) {
                let department_id;
                for (let i = 0; i < res.length; i++) {
                    department_id = res[i].id;
                }
            },
            
            db.query('INSERT INTO roles SET ?',
                {
                    title: answer.role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if (err) throw err;
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    loadPrompts();
            }
            ))
    })
}

function addEmployee() {
    db.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
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
                {
                    name: 'manager_id',
                    type: 'input',
                    message: "What is the employee's manager's ID?"
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function() {
                        let roles = [];
                        for (let i = 0; i < res.length; i++) {
                            roles.push(res[i].title);
                        } return roles;
                    },
                    message: "What is this employee's role? "
                }
            ]).then(function (answer) {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].title == answer.role) {
                        roles_id = res[i].id;
                        console.log(roles_id);
                    }
                }
                db.query('INSERT INTO employees SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    manager_id: answer.manager_id,
                    role_id: role_id,
                },
                function (err) {
                    if (err) throw err;
                    console.log('Your employee has been added!');
                    loadPrompts();
                })
            })
    })
};

function updateEmployee() {
    
}

function quit() {
    db.end();
}