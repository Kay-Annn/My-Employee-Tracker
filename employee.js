
import util from 'util';
import inquirer from 'inquirer';
import Roles from './role.js';



class Employees extends Roles {
    constructor(db) {
        super()
        this.first_name = "";
        this.last_name = "";
        this.role_id = "";
        this.department = "";
        this.salary = "";
        this.manager_id = "";
        this.db = db;

    }

    // View all Employee
    async viewAllEmployees() {
        const query = util.promisify(this.db.query).bind(this.db);
        try {
            const rows = await query(`SELECT employee.id, employee.first_name, employee.last_name,
            role.title AS title , department.department_name, role.salary, manager.manager_name FROM ((employee INNER JOIN role ON employee.role_id = role.id)
            INNER JOIN department on role.department_id = department.id)
            INNER JOIN manager ON manager.id = employee.manager_id
            `);
            console.table(rows);
        } catch (err) {
            console.log("error viewing Employees", err)
        }
    }




    //Get All Managers
    async getAllManagers() {
        const query = util.promisify(this.db.query).bind(this.db);
        try {
            const rows = await query('SELECT id, manager_name AS name FROM manager');
            return rows;
        } catch (err) {
            console.log("error viewing managers", err)
        }
    }

    //Add an Employee
    async addEmployee() {
        await this.addEmployeesQuestions()
        const query = util.promisify(this.db.query).bind(this.db);
        try {
            const rows = await query('INSERT INTO employee SET ?', { first_name: this.first_name, last_name: this.last_name, role_id: this.role_id, manager_id: this.manager_id });
            console.table(rows);
        } catch (err) {
            console.log("error adding Employee", err)
        }
    }

    async addEmployeesQuestions() {
        const roleList = await this.getAllRoles()
        const managerList = await this.getAllManagers()
        const questions = [
            {
                type: 'input',
                message: 'What is the employees first name?',
                name: "FirstName"
            },

            {
                type: 'input',
                message: 'What is the employees last name?',
                name: "LastName"
            },

            {
                type: 'list',
                message: 'What is the employees role?',
                choices: roleList,
                name: "role_id"
            },

            {
                type: 'list',
                message: 'Who is the employees manager?',
                choices: managerList,
                name: "EmployeeManager"
            },
        ]

        const employeeName = await inquirer.prompt(questions)
        this.first_name = employeeName.FirstName
        this.last_name = employeeName.LastName
        const selectedRoleId = roleList.filter(item => item.name === employeeName.role_id)
        this.role_id = selectedRoleId[0].id
        const selectedManagerId = managerList.filter(manager => manager.name === employeeName.EmployeeManager)
        this.manager_id = selectedManagerId[0].id

    }
}

export default Employees;



