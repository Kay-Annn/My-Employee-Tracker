
import util from 'util';
import inquirer from 'inquirer';

class Department {
    constructor(db) {
        this.name = "";
        this.db = db;
    }

    // View all department
    async viewAllDepartments() {
       
        const query = util.promisify(this.db.query).bind(this.db);
        try {
            const rows = await query('SELECT id, department_name AS name FROM department');
            console.table(rows);
        } catch {
            console.log("error viewing Departments")
        }
    }

      // return all department
      async getAllDepartments() {
       
        const query = util.promisify(this.db.query).bind(this.db);
        try {
            const rows = await query('SELECT id, department_name AS name FROM department');
            return rows
        } catch {
            console.log("error viewing Departments")
        }
    }

    //Add a department
    async addDepartment() {
       await this.addDepartmentsQuestions() 
        const query = util.promisify(this.db.query).bind(this.db);
        try {
            const rows = await query('INSERT INTO department SET ?', {department_name: this.name});
        } catch {
            console.log("error adding Departments")
        }
    }

    async addDepartmentsQuestions() {
        const questions = [
            {
                type: 'input',
                message: 'What is your department name?',
                name: "AddDepartment"
            },
        ] 
        const departmentName = await inquirer.prompt(questions)
        this.name = departmentName.AddDepartment
    }


}

export default Department;



