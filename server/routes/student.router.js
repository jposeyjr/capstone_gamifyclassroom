const express = require('express');
const pool = require('../modules/pool');
const sendEmail = require('../controllers/email.controller');
const encryptLib = require('../modules/encryption');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route
 * used to get a list of students from a specific course
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  let sqlText = `SELECT student_id, first_name, last_name, email, points, last_point_date, avatar, course FROM student_courses
  JOIN courses on student_courses.course = courses.id 
  JOIN person on student_courses.student_id = person.id
  WHERE courses.id = $1 ORDER BY first_name, last_name `;
  pool
    .query(sqlText, [id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log('Error getting student info from DB: ', error);
      res.sendStatus(500);
    });
});

/**
 * GET route
 * used to get a single students detailed information
 */
router.get('/solo/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  let sqlText = `SELECT person.first_name, person.id, person.last_name, person.avatar, person.email, person.start_date, student_courses.points, student_courses.course 
  FROM person 
  JOIN student_courses on student_courses.student_id = person.id
  WHERE person.id = $1`;
  pool
    .query(sqlText, [id])
    .then((result) => res.send(result.rows[0]))
    .catch((error) => {
      console.log('Error getting solo student info from DB: ', error);
      res.sendStatus(500);
    });
});

/**
 * PUT route
 * used to get updated information from DB to reflect the teacher clicking on a student
 */

router.put('/point/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  let sqlText = `UPDATE student_courses SET points = points + 1 WHERE student_id = $1`;
  pool
    .query(sqlText, [id])
    .then((result) => {
      sqlText = `UPDATE person SET last_point_date = now() WHERE id = $1`;
      pool.query(sqlText, [id]);
    })
    .then((result) => res.send(id))
    .catch((error) => {
      console.log('Error adding points to student info in the DB: ', error);
      res.sendStatus(500);
    });
});

/**
 * POST route adding a new student into the DB
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const data = req.body;
  const password = encryptLib.encryptPassword(req.body.password);
  const role_id = 3;
  const school = data.school || 1;
  const sqlText = `
  INSERT INTO person (first_name, last_name, email, password, role_id, school, start_date, avatar)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING id;`;

  pool
    .query(sqlText, [
      data.first_name,
      data.last_name,
      data.email,
      password,
      role_id,
      school,
      data.start_date,
      data.avatar,
    ])
    //used to add them to the current course the teacher was in at the time of adding the student
    .then((result) => {
      const nextSQL = `INSERT INTO student_courses (points, student_id, course) 
     VALUES ($1, $2, $3)`;
      const createdStudentID = result.rows[0].id;
      const courseID = req.body.course;
      pool.query(nextSQL, [0, createdStudentID, Number(courseID)]);
    })
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error posting to the DB for student on server:', error);
      res.sendStatus(500);
    });
});

/**
 * POST route
 * sends data to nodemailer to create a custom url string for the student to register for the teachers school and course
 */
router.post('/email', rejectUnauthenticated, (req, res) => {
  const teacher = req.user;
  const student_email = req.body.studentEmail;
  const courseID = req.body.courseID;
  sendEmail(teacher, student_email, courseID);
});

/**
 * PUT route
 * updating any information that might of been changed by the teacher
 */

router.put('/id', rejectUnauthenticated, (req, res) => {
  const data = req.body;
  const id = req.body.id;
  const sqlText = `UPDATE person SET first_name = $1, last_name = $2, email = $3, start_date=$4, avatar=$5
  WHERE person.id = $6 `;
  pool
    .query(sqlText, [
      data.first_name,
      data.last_name,
      data.email,
      data.start_date,
      data.avatar,
      id,
    ])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error on server updating student: ', error);
      res.sendStatus(500);
    });
});

router.put('/avatar', rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const data = req.body.student;
  const avatarImg = req.body.avatar;
  const sqlText = `UPDATE person SET first_name = $1, last_name = $2, email = $3, start_date=$4, avatar=$5
  WHERE person.id = $6 `;
  pool
    .query(sqlText, [
      data.first_name,
      data.last_name,
      data.email,
      data.start_date,
      avatarImg,
      data.id,
    ])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error on server updating student: ', error);
      res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  let sqlText = `DELETE FROM person WHERE id=$1`;
  pool
    .query(sqlText, [id])
    .then((result) => {
      let sqlText = `DELETE FROM student_courses WHERE student_id = $1`;
      pool.query(sqlText, [id]);
    })
    .then((result) => res.sendStatus(204))
    .catch((error) => {
      console.log('Error on server deleting student: ', error);
      res.sendStatus(500);
    });
});

module.exports = router;
