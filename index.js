// Dependencies
const mysql = require('mysql');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
require('console.table');

// Create database connection through mysql
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

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
                message: 'What would you like to do?',
                choices: [
                    {
                        name: 'View All Employees',
                        value: 'VIEW_EMPLOYEES'
                    },
                    {
                        name: 'View All Departments',
                        value: 'VIEW_ALL_DEPARTMENTS'
                    },
                    {
                        name: 'View All Roles',
                        value: 'VIEW_ALL_ROLES'
                    },
                    {
                        name: 'Add A Department',
                        value: 'ADD_DEPARTMENT'
                    },
                    {
                        name: 'Add A Role',
                        value: 'ADD_ROLE'
                    },
                    {
                        name: 'Add An Employee',
                        value: 'ADD_EMPLOYEE'
                    },
                    {
                        name: 'Update Employee Role',
                        value: 'UPDATE_EMPLOYEE_ROLE'
                    },
                    {
                        name: 'Quit',
                        value: 'QUIT'
                    }
                ]
            } .then(function(val) {
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
                        init();
                    break;
                }
            })
        ])
}

function viewAllEmployees() {
    db.query()
}

function viewDepartments() {
    
}

function viewRoles() {
    
}

function addDepartment() {
    
}

function addRole() {
    
}

function addEmployee() {
    
}

function updateEmployee() {
    
}