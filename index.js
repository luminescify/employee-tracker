const inquirer = require('inquirer');
const { prompt } = require('inquirer');
const db = require('./db');
require('console.table');

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
                    }
                ]
            }
        ])
}