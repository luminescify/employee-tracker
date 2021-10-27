INSERT INTO departments (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Human Resources"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Developer", 120000, 2),
       ("Salesperson", 70000, 1),
       ("HR Rep", 80000, 4),
       ("Accountant", 100000, 3),
       ("Lawyer", 190000, 5);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Jason", "Lao", 1),
       ("Mia", "Samson", 5),
       ("Jess", "Melby", 2),
       ("Kris", "Parson", 3),
       ("Lucas", "Grati", 4);

UPDATE company_db.employees 
SET manager_id = 1 
WHERE (id > 1);