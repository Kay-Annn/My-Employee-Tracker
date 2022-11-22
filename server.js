import express from 'express';
import inquirer from 'inquirer';
import mysql from 'mysql2';
import cTable from 'console.table';
import Department from './department.js';
import Role from './role.js';
import sequelize from './config/connection.js';

const PORT = process.env.PORT || 3000;
const app = express();
const db = sequelize;


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mainMenu =
  [
    {
      type: 'list',
      message: 'What would you like to do?',
      choices: ["View All Employees", "Update Employee Role", "View All Roles", "Add a Role", "View All Departments", "Add Department"],
      name: "Task"
    },
  ]

const role = new Role(db);
const department = new Department(db);

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

}

showMenu()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


