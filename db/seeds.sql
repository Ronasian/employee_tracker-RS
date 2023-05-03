use employees;

INSERT INTO department (name)
VALUES
    ('Management'),
    ('Marketing'),
    ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Regional Manager', 120000, 1),
    ('Assistant Manager', 100000, 1),
    ('Visual Designer', 80000, 2),
    ('Content Marketer', 90000, 2),
    ('Accountant', 75000, 3),
    ('Bookkeeper', 70000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Bob', 'Smith', 1, NULL),
    ('John', 'Turner', 2, 1),
    ('Maria', 'Gomez', 3, NULL),
    ('Tim', 'Johnson', 4, 3),
    ('Lisa', 'White', 5, NULL),
    ('Joseph', 'Martin', 6, 5);