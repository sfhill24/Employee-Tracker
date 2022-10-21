DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);
CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    CONSTRAINT fk_departments
     FOREIGN KEY (department_id) REFERENCES departments(id)
);
CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    CONSTRAINT fk_roles
        FOREIGN KEY (role_id) REFERENCES roles(id),
    manager_id INT,
    CONSTRAINT fk_employees
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);


INSERT INTO departments (name)
VALUES ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', '100000', '1'),
    ('Salesperson', '80000', '1'),
    ('Lead Engineer', '150000', '2'),
    ('Software Engineer', '120000', '2'),
    ('Account Manager', '160000', '3'),
    ('Accountant', '125000', '3'),
    ('Legal Team Lead', '250000', '4'),
    ('Lawyer', '190000', '4');
   

INSERT INTO employees
(first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', '1', null),
('Mike', 'Chan', '2', '1'),
('Ashley', 'Rodriguez', '3', null),
('Kevin', 'Tupike', '4','3'),
('Kunal', 'Singh', '5', null),
('Malia', 'Brown', '6','5'),
('Sarah', 'Lourd', '7', null),
('Tom', 'Allen', '8','7');



