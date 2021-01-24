--Adds users 
INSERT INTO person(
	first_name, last_name, email, password, role_id, school)
	VALUES ('Meghan', 'Posey', 'harley@gmail.com', '$2a$10$XKhWwUFH4MBrF38USUeJQOPFNPJYugQyJHnKvMfHAM.HusSSFpRrW', 2, 1);

INSERT INTO person(
	first_name, last_name, email, password, role_id, school)
	VALUES ('James', 'Posey', 'python@gmail.com', '$2a$10$hFq4s.fZUjW/rZcl5DsP..K60408j3HVW7.CJfGC7y55Ihtaetp.e', 3, 1);

INSERT INTO person(
	first_name, last_name, email, password, role_id, school)
	VALUES ('Harley', 'Posey', 'yesop@gmail.com', '$2a$10$1QEndOzaC3idYzjVlbFUJekTXp9oKQyH6Bs/j7.YWfeJUNRevq30S', 3, 1);

INSERT INTO person(
	first_name, last_name, email, password, role_id, school)
	VALUES ('Real', 'Person', 'fake@gmail.com', '$2a$10$1QEndOzaC3idYzjVlbFUJekTXp9oKQyH6Bs/j7.YWfeJUNRevq30S', 3, 1);

--Add courses 
INSERT INTO courses(
	 start_date, end_date, course_name, teacher_id)
	VALUES ( '01-05-21', '07-08-21', 'Zhu', '2');

INSERT INTO courses(
	 start_date, end_date, course_name, teacher_id)
	VALUES ( '02-05-21', '05-28-21', 'Yesop', '1');

--Relates the student to the course 
INSERT INTO student_courses(
	 points, student_id, course)
	VALUES ( 0, 2, 1);

INSERT INTO student_courses(
	 points, student_id, course)
	VALUES ( 0, 3, 1);

INSERT INTO student_courses(
	 points, student_id, course)
	VALUES ( 0, 4, 2);