const fs = require("fs");
const inquirer = require("inquirer");



function menuPrompt() {
    return inquirer.prompt([
        {
            type: "list",
            name: "answer",
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Employee Role", "Quit"]
        },
    ]);
}





 async function init() {
    let resp = await menuPrompt();
    console.log(resp.answer);
}

init();