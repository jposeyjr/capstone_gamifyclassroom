
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


CREATE TABLE "person" (
	"id" serial NOT NULL,
	"first_name" serial(255) NOT NULL,
	"last_name" serial(255),
	"email" varchar(255) NOT NULL,
	"password" varchar(1000) NOT NULL,
	"role_id" integer NOT NULL,
	"school" integer NOT NULL,
	"start_date" DATE NOT NULL,
	"avatar" varchar(1000) NOT NULL,
	"last_point_date" date NOT NULL,
	CONSTRAINT "person_pk" PRIMARY KEY ("id")
);



CREATE TABLE "courses" (
	"id" serial NOT NULL UNIQUE,
	"start_date" DATE NOT NULL,
	"end_date" DATE NOT NULL,
	"course_name" varchar(255) NOT NULL,
	"department" varchar(255) NOT NULL,
	"teacher_id" integer NOT NULL,
	"co-teacher" integer NOT NULL,
	CONSTRAINT "courses_pk" PRIMARY KEY ("id")
);



CREATE TABLE "student_courses" (
	"id" serial NOT NULL,
	"student_id" integer NOT NULL,
	"course" integer,
	"points" integer NOT NULL,
	CONSTRAINT "student_courses_pk" PRIMARY KEY ("id")
);



CREATE TABLE "school" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "school_pk" PRIMARY KEY ("id")
);



CREATE TABLE "roles" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "roles_pk" PRIMARY KEY ("id")
);


ALTER TABLE "person" ADD CONSTRAINT "person_fk0" FOREIGN KEY ("role_id") REFERENCES "roles"("id");
ALTER TABLE "person" ADD CONSTRAINT "person_fk1" FOREIGN KEY ("school") REFERENCES "school"("id");

ALTER TABLE "courses" ADD CONSTRAINT "courses_fk0" FOREIGN KEY ("teacher_id") REFERENCES "person"("id");
ALTER TABLE "courses" ADD CONSTRAINT "courses_fk1" FOREIGN KEY ("co-teacher") REFERENCES "person"("id");

ALTER TABLE "student_courses" ADD CONSTRAINT "student_courses_fk0" FOREIGN KEY ("id") REFERENCES "person"("id");
ALTER TABLE "student_courses" ADD CONSTRAINT "student_courses_fk1" FOREIGN KEY ("student_id") REFERENCES "person"("id");
ALTER TABLE "student_courses" ADD CONSTRAINT "student_courses_fk2" FOREIGN KEY ("course") REFERENCES "courses"("id");

-- Fake Data
INSERT into "school" ("name")
VALUES ('prime')

SELECT * FROM school

INSERT into roles ("name") 
VALUES ('admin')

INSERT into roles ("name") 
VALUES ('teacher')

INSERT into roles ("name") 
VALUES ('student')

SELECT * FROM roles

-- admin should be 1, teacher 2, student 3 if you made a mistake use the below code to reset the ID's and remove all the previous. 
ALTER SEQUENCE roles_id_seq RESTART WITH 1

INSERT INTO person(
	first_name, last_name, email, password, role_id, school)
	VALUES ('James', 'Posey', 'fake@gmail.com', 'dasdasdas', 3, 1);
	
	
INSERT INTO person(
	first_name, last_name, email, password, role_id, school)
	VALUES ('Harley', 'Posey', 'fake2@gmail.com', 'dasdasdas', 2, 1);
	
INSERT INTO person(
	first_name, last_name, email, password, role_id, school)
	VALUES ('Meghan', 'Posey', 'fake3@gmail.com', 'dasdasdas', 1, 1);

SELECT * FROM person 

INSERT INTO courses(
	 start_date, end_date, course_name, department, teacher_id)
	VALUES ( '01-05-21', '02-28-21', 'Vatti', 'Coding', '3');

SELECT * FROM courses

INSERT INTO public.student_courses(
	 points, student_id, course)
	VALUES ( 0, 2, 1);

SELECT * FROM student_courses