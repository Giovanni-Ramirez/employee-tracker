const inquirer = require("inquirer");
const pool = require('../config/connection.js');
pool.connect();


function viewAllDepartment() {
    pool.query('SELECT * FROM department' , function (err, {rows}) {
        console.clear();
        console.table(rows);
        console.log('use arrows for next action')
    })
};

function addDepartmentRequest(){
    inquirer
      .prompt([
        {
            type: 'input',
            message: 'Name of new department?',
            name: 'newDepartment',
        },
      ])
      .then((response) => {
        pool.query(`INSERT INTO department (name) VALUES ('${response.newDepartment}')` , function (err, {rows}) {
          console.clear();
          console.table(rows);
          console.log('use arrows for next action');

          
      })
      })
    };

module.exports = {viewAllDepartment, addDepartmentRequest};