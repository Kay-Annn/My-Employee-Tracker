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
            console.table(rows);
        } catch {
            console.log("error viewing Roles")
        }
    }


    //Add a role
    async addRole() {
        await this.addRolesQuestions()
        const query = util.promisify(this.db.query).bind(this.db);
        try {
            const rows = await query('INSERT INTO role SET ?', { id: 25, title: this.title, salary: this.salary, department_id: this.department_id });
        } catch {
            console.log("error adding Role")
        }
    }

    async addRolesQuestions() {
        const departmentList = await this.getAllDepartments();
        const questions = [
            {
                type: 'input',
                message: 'What is your role?',
                name: "RoleTitle"
            },
            {
                type: 'input',
                message: 'What is the salary for this role?',
                name: "RoleSalary"
            },

            {
                type: 'list',
                message: 'What is the department for this role?',
                choices: departmentList,
                name: "department_name"
            },
        ]

        const roleName = await inquirer.prompt(questions)
        this.title = roleName.RoleTitle
        this.salary = roleName.RoleSalary
        const selectedDepId = departmentList.filter(item => item.name === roleName.department_name)
        this.department_id = selectedDepId[0].id
    }

}

export default Roles;







