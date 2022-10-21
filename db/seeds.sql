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
(first_name, last_name, role_id, department_id, salary, manager_id)
VALUES
('John', 'Doe', 'Sales Lead', 'Sales', '100000', 'null'),
('Mike', 'Chan', 'Salesperson', 'Sales', '80000', 'John Doe'),
('Ashley', 'Rodriguez', 'Lead Engineer', 'Engineering', '150000', 'null'),
('Kevin', 'Tupike', 'Software Engineer', 'Engineering', '120000', 'Ashley Rodriguez'),
('Kunal', 'Singh', 'Account Manager', 'Finance', '160000', 'null'),
('Malia', 'Brown', 'Accountant', 'Finance', '125000', 'Kunal Singh'),
('Sarah', 'Lourd', 'Legal Team Lead', 'Legal', '250000', 'null'),
('Tom', 'Allen', 'Lawyer', 'Legal', '190000', 'Sarah Lourd');*/
