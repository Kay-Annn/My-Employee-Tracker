
import util from 'util';
import inquirer from 'inquirer';
import Department from './department.js';



class Roles extends Department {
    constructor(db) {
        super()
        this.id = "";
        this.title = "";
        this.salary = "";
        this.department_id = "";
        this.db = db;

    }

    // View all roles
    async viewAllRoles() {
        const query = util.promisify(this.db.query).bind(this.db);
        try {
            const rows = await query('SELECT * FROM role');
            console.log(rows);
        } catch {
            console.log("error viewing Roles")
        }
    }

    //Add a role
    async addRole() {
        await this.addRolesQuestions()
        const query = util.promisify(this.db.query).bind(this.db);
        try {
            const rows = await query('INSERT INTO role SET ?', { id: 1, title: this.title, salary: this.salary, department_id: this.department_id });
            console.log(rows);
        } catch {
            console.log("error adding Role")
        }
    }

    async addRolesQuestions() {
        const departmentList = await this.getAllDepartments();
        console.log("all dep", departmentList)
        const questions = [
            {
                type: 'input',
                message: 'What is your role?',
                name: "RoleName"
            },
            {
                type: 'input',
                message: 'What is the salary for this role?',
                name: "RoleSalary"
            },

            {
                type: 'list',
                choices: [
                {
                    id: 1,
                    name: 'Finance',
                },
                {
                    id: 2,
                    name: 'Sales',
                  },

                ] ,
                name: "RoleDepartment"
            },
        ]

        const roleName = await inquirer.prompt(questions)
        this.title = roleName.RoleName
        this.salary = roleName.RoleSalary
        this.department_id = roleName.RoleDepartment
    }
}

export default Roles;



