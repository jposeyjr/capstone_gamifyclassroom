--Used to get the database started
CREATE TABLE "person" (
	"id" serial NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255),
	"email" varchar(255) UNIQUE NOT NULL,
	"password" varchar(1000) NOT NULL,
	"role_id" integer,
	"school" integer,
	"start_date" DATE,
	"avatar" varchar(100000), 
	"last_point_date" date, 
	CONSTRAINT "person_pk" PRIMARY KEY ("id")
);

CREATE TABLE "courses" (
	"id" serial NOT NULL UNIQUE,
	"start_date" DATE,
	"end_date" DATE,
	"course_name" varchar(255) NOT NULL,
	"teacher_id" integer NOT NULL,
	"coteacher_id" integer,
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

ALTER TABLE "student_courses" ADD CONSTRAINT "student_courses_fk0" FOREIGN KEY ("id") REFERENCES "person"("id");
ALTER TABLE "student_courses" ADD CONSTRAINT "student_courses_fk1" FOREIGN KEY ("student_id") REFERENCES "person"("id");
ALTER TABLE "student_courses" ADD CONSTRAINT "student_courses_fk2" FOREIGN KEY ("course") REFERENCES "courses"("id");

-- Adds Roles
INSERT into roles ("name") 
VALUES ('admin');

INSERT into roles ("name") 
VALUES ('teacher');

INSERT into roles ("name") 
VALUES ('student');

-- Adds a school
INSERT into "school" ("name")
VALUES ('prime');
