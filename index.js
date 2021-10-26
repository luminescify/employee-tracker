const inquirer = require('inquirer');
const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');
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
                        value: 'ADD_A_DEPARTMENT'
                    },
                    {
                        name: 'Add A Role',
                        value: 'ADD_A_ROLE'
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

                }
            })
        ])
}