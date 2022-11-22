
import util from 'util';
import inquirer from 'inquirer';
import Department from './department.js';



class Employees extends Department {
    constructor(db) {
        super()
        this.id = "";
        this.first_name = "";
        this.last_name = "";
        this.job_title = "";
        this.department = "";
        this.salary = "";
        this.manager = "";
        this.db = db;

    }

    // View all roles
    async viewAllEmployees() {
        const query = util.promisify(this.db.query).bind(this.db);
        try {
            const rows = await query('SELECT * FROM employee');
            console.table(rows);
        } catch {
            console.log("error viewing Employees")
        }
    }

    //Add an Employee
    async addEmployee() {
        await this.addEmployeesQuestions()
        const query = util.promisify(this.db.query).bind(this.db);
        try {
            const rows = await query('INSERT INTO employee SET ?', { id: 1, first_name: this.first_name, last_name: this.last_name, role_id:this.role_id, manager_id:this.manager });
            console.table(rows);
        } catch {
            console.log("error adding Employee")
        }
    }

    async addEmployeesQuestions() {
             const questions = [
            {
                type: 'input',
                message: 'What is the employees first_name?',
                name: "FirstName"
            },

            {
                type: 'input',
                message: 'What is the employees last_name?',
                name: "LastName"
            },

            {
                type: 'list',
                message: 'What is the employees role?', 
                choices: [
                {
                   name:3,
                },
                {
                    name: 10,
                  },

                ] ,
                name: "role_id"
            },

            {
                type: 'list',
                message: 'Who is the employees manager?', 
                choices: [
                {
                   name: 1,
                },
                {
                    name: 2,
                  },

                ] ,
                name: "EmployeeManager"
            },
        ]

        const employeeName = await inquirer.prompt(questions)
        this.first_name = employeeName.FirstName
        this.last_name = employeeName.LastName
        this.role_id = employeeName.role_id
        this.department = employeeName.department
        this.salary = employeeName.RoleSalary
        this.department_id = employeeName.RoleDepartment
        this.manager = employeeName.EmployeeManager

        console.log(this.manager)
    }
}

export default Employees;



