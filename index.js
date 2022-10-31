const fs = require("fs");
const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'election'
    },
    console.log('Connected to the database.')
).promise();

//main menu to prompt user
const mainMenu = async () => {
    const { choice } = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update Employee Role", "Quit"]
        }
    ])

    switch (choice) {
        case 'View All Departments':
            viewDepartments();
            break;
        case 'View All Roles':
            viewRoles();
            break;
        case 'View All Employees':
            viewEmployees();
            break;
        case 'Add a Department':
            addDepartment();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Add an Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'Quit':
            process.exit();
            break;

        default:
            process.exit();
    }
};

//function to view all departments
const viewDepartments = async () => {
    const [deptData] = await db.query(`SELECT * FROM departments`)
    console.table(deptData);
    mainMenu();
}

//function to view all roles
const viewRoles = async () => {
    const [roleData] = await db.query(`SELECT roles.id, title, departments.name AS department 
    FROM roles 
    LEFT JOIN departments ON roles.department_id = departments.id`)
    console.table(roleData);
    mainMenu();
}

//function to view all employees
const viewEmployees = async () => {
    const [employeeData] = await db.query(`SELECT employees.id, employees.first_name, employees.last_name, departments.name AS department, roles.title AS title, roles.salary AS salary, CONCAT(managers.first_name,' ', managers.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id
    LEFT JOIN employees As managers ON employees.manager_id = managers.id`);
    console.table(employeeData);
    mainMenu();
}

//function to add department
const addDepartment = async () => {
    let newDept = await inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the name of the department you want to add?"
        }
    ]);

    await db.query('INSERT INTO departments (name) VALUES (?)', [newDept.deptName]);
    mainMenu();
}

//function to add role
const addRole = async () => {
    let [dept] = await db.query(`SELECT * FROM departments`);
    let deptList = dept.map(x => x.name);

    let newRole = await inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the name of the role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the role?"
        },
        {
            name: "department",
            type: "list",
            message: "Which department does this role belong to?",
            choices: deptList

        }
    ]);

    let deptID = dept.find(x => x.name == newRole.department);
    await db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, [newRole.title, newRole.salary, deptID.id]);

    mainMenu();
}

//function to add an employee
const addEmployee = async () => {
    let [roles] = await db.query(`SELECT * FROM roles`);
    let roleList = roles.map(x => x.title)

    let [managers] = await db.query(`SELECT * FROM employees WHERE manager_id IS NULL`);
    let managerList = managers.map(x => x.first_name + " " + x.last_name)

    managerList.unshift("None");

    let newEmployee = await inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: roleList
        },
        {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?",
            choices: managerList
        },
    ]);

    let roleID = roles.find(x => x.title == newEmployee.role);

    let managerName = newEmployee.manager.split(' ');
    let managerFirstName = managerName[0];
    let managerLastName = managerName[1];
    let managerID = managers.find(x => x.first_name == managerFirstName && x.last_name == managerLastName);

    let id = null;
    if (managerID != undefined) {
        id = managerID.id;
    }

    await db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [newEmployee.firstName, newEmployee.lastName, roleID.id, id]);

    mainMenu();
}

//function to update employee
const updateEmployeeRole = async () => {
    let [roles] = await db.query(`SELECT * FROM roles`);
    let roleList = roles.map(x => x.title)

    let [employees] = await db.query(`SELECT * FROM employees`);
    let employeeList = employees.map(x => x.first_name + " " + x.last_name);


    let updatedRole = await inquirer.prompt([
        {
            name: "employee",
            type: "list",
            message: "Which employees'role do you want to update?",
            choices: employeeList
        },
        {
            name: "role",
            type: "list",
            message: "Which role do you want to assign the selected employee?",
            choices: roleList
        },
    ]);

    let selectedRole = roles.find(x => x.title == updatedRole.role);
   
    let employeeName = updatedRole.employee.split(' ');
    let employeeFirstName = employeeName[0];
    let employeeLastName = employeeName[1];
    let employeeID = employees.find(x => x.first_name == employeeFirstName && x.last_name == employeeLastName);

    await db.query(`UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ?`, [selectedRole.id, employeeFirstName, employeeLastName]);

    mainMenu();
}

mainMenu();




