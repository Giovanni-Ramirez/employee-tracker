const inquirer = require("inquirer");
const { Pool } = require('pg');
const table = require('console.table');

require('dotenv').config();

const pool = new Pool(
    {
      user: process.env.POST_USER,
      password: process.env.POST_PASS,
      host: 'localhost',
      database: process.env.POST_DB
    },
    console.log(`Connected to the employee_manager_db database.`)
)
  
pool.connect();

const listOfOptions = ['a', 'stop'];

function mainQuestion(){
inquirer
  .prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'choice',
        choices: listOfOptions,
    },
  ])
  .then((response) => {
    if (response.choice == 'a'){
        console.log('you got a')
        viewAllDepartment();
    } else {
        process.exit();
    }
  })
};



async function viewAllDepartment() {
    console.log('i was ran');
    try {
        await pool.query('SELECT id, name FROM department' , function (err, {rows}) {
        console.table(rows);
    })
    mainQuestion();
    } catch (err){
        console.log(err)
    }
}


//starts the main question
mainQuestion();