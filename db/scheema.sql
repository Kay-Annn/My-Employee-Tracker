DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
  );

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role_id INT,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL
);

CREATE TABLE manager (
    id INT AUTO_INCREMENT PRIMARY KEY,
  manager_name VARCHAR(100)
);

SELECT * FROM department;

INSERT INTO department (department_name)
VALUES('Finance'); 

SELECT * FROM role;

INSERT INTO role (id,title, salary)
VALUES('Accountant','60000'); 

