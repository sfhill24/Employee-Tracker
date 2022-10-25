DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);
CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_departments FOREIGN KEY (department_id) REFERENCES departments(id)
    ON DELETE CASCADE
);
CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id)
    ON DELETE SET NULL,
    manager_id INT,
    CONSTRAINT fk_employees FOREIGN KEY (manager_id) REFERENCES employees(id)
    ON DELETE SET NULL
);
