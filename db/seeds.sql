INSERT INTO departments (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Human Resources"),
       ("Legal");

INSERT INTO roles (department_id, title, salary)
VALUES (2, "Developer", 120000),
       (1, "Salesperson", 70000),
       (4, "HR", 80000),
       (3, "Accountant", 100000),
       (5, "Lawyer", 190000);

INSERT INTO employees (role_id, first_name, last_name, manager_id)
VALUES (1, "Jason", "Lao", null),
       (2, "Mia", "Samson", 3),
       (3, "Jess", "Melby", 5),
       (4, "Kris", "Parson", 2),
       (5, "Lucas", "Grati", 1);