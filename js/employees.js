const inquirer = require("inquirer");
const pool = require('../config/connection.js');
pool.connect();



function testPool () {
    pool.query('SELECT * FROM department' , function (err, {rows}) {
        console.clear();
        console.table(rows);
        console.log('use arrows for next action')
    });
}

testPool();