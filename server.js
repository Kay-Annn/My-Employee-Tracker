import express from 'express';
import inquirer from 'inquirer';
import mysql from 'mysql2';
import cTable from 'console.table';
import Department from './department.js';
import Roles from './role.js';
import Employees from './employee.js';

const PORT = process.env.PORT || 3000;
const app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: 'add your password&&&',
    database: 'employeetracker_db'
  },
  console.log(`Connected to the employeetracker_db database.`)
);

const mainMenu =
  [
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add a Role", "View All Departments", "Add Department"],
      name: "Task"
    },
  ]

// import mysql from 'mysql2';
const department = new Department(db);
const employee = new Employees(db);
const role = new Roles(db);


async function showMenu() {
  const mainMenuInfo = await inquirer.prompt(mainMenu)
 

  if (mainMenuInfo.Task === "View All Departments") {
    await department.viewAllDepartments()
    showMenu()
   
  }

  if (mainMenuInfo.Task === "Add Department") {
    await department.addDepartment()
      showMenu()
  }

  if (mainMenuInfo.Task === "View All Roles") {
    await role.viewAllRoles()
    showMenu()
  }

  if (mainMenuInfo.Task === "Add a Role") {
    await role.addRole()
    showMenu()
  }

  if (mainMenuInfo.Task === "View All Employees") {
    await employee.viewAllEmployees()
    showMenu()
  }

  if (mainMenuInfo.Task === "Add Employee") {
    await employee.addEmployee()
    showMenu()
  }

}
showMenu()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
});

