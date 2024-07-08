const inquirer = require("inquirer");
const pool = require('../config/connection.js');
pool.connect();

//npm package to display tables in console
const table = require('console.table');

// Gets the functions from the js/departments file
const {viewAllDepartment, addDepartmentRequest} = require('./departments.js');


function mainQuestion(){
  console.clear();
  const listOfOptions = ['View All Employees', 'Add Employees', 'Update Emploee Role', 'View all Roles', 'Add Roles', 'View All Departments', 'Add Department', 'Quit'];
  inquirer
    .prompt([
      {
          type: 'list',
          message: 'What would you like to do?',
          name: 'mainRequest',
          choices: listOfOptions
      }
    ])
    .then((response) => {
      switch (response.mainRequest) {
          case 'View All Employees':
                viewAllEmployee();
                mainQuestion();
              break;

          case 'Add Employees':
              addEmployeeRequest();
              break;

          case 'Update Emploee Role':
                console.log('not working')
                process.exit();
              break;

          case 'View all Roles':
                viewAllRoles();
                mainQuestion();
              break;

          case 'Add Roles':
                addRoleRequest();
              break;

          case 'View All Departments':
                viewAllDepartmentTest();
                mainQuestion();
              break;

          case 'Add Department':
                addDepartmentRequestTest();
              break;

          case 'Quit':
              process.exit();
          default:
            console.log('not working')
            process.exit();
      }
    })
    .catch((error) => {
      console.log(error);
    })
};

// Employee functions
function viewAllEmployee () {
    pool.query('SELECT * FROM employee' , function (err, {rows}) {
      if (err) throw err;
      console.clear();
      console.table(rows);
      console.log('use arrows for next action');
  });
}

function addEmployeeRequest(){
  inquirer
    .prompt([
      {
          type: 'input',
          message: 'Enter First Name',
          name: 'firstName',
      },
      {
          type: 'input',
          message: 'Enter Last Name',
          name: 'lastName',
      },
     
      {
          type: 'input',
          message: 'what role id number?',
          name: 'idNumber',
      },
    ])
    .then((response) => {
      pool.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${response.firstName}', '${response.lastName}', '${response.idNumber}')` , function (err, {rows}) {
        if (err) {
          console.log(err);
        }
        console.clear();
        console.log('added a new employee');

        mainQuestion();
    })
    })
  };



//Role Functions
function viewAllRoles () {
  pool.query('SELECT * FROM role' , function (err, {rows}) {
    if (err) throw err;
    console.clear();
    console.table(rows);
    console.log('use arrows for next action');

});
}

function addRoleRequest() {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Title of role?',
        name: 'roleTitle',
      },
      {
        type: 'input',
        message: 'Salary of role?',
        name: 'roleSalary',
      },
      {
        type: 'input',
        message: 'What department id number?',
        name: 'roleDepartmentId',
      },
    ])
    .then((response) => {
      pool.query(`INSERT INTO role (title, salary, department) VALUES ('${response.roleTitle}', '${response.roleSalary}', ${response.roleDepartmentId})`, function (err, result) {
        if (err) {
          console.error('Error adding role:', err);
        } else {
          console.clear();
          console.log('Added a new role');
          
          mainQuestion();
        }
      });
    });
}


// Department functions
function viewAllDepartmentTest () {
    pool.query('SELECT * FROM department' , function (err, {rows}) {
      if (err) throw err;
      console.clear();
      console.table(rows);
      console.log('use arrows for next action');

  });
}

function addDepartmentRequestTest(){
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
        console.log('added a new department');

        mainQuestion();
    })
    })
  };

module.exports = {mainQuestion};