const express = require('express');
const pool = require('../modules/pool');
const encryptLib = require('../modules/encryption');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  let sqlText = `SELECT student_id, first_name, last_name, email, points, last_point_date, avatar FROM student_courses
  JOIN courses on student_courses.course = courses.id 
  JOIN person on student_courses.student_id = person.id
  WHERE courses.id = $1`;
  pool
    .query(sqlText, [id])
    .then((result) => res.send(result.rows))
    .catch((error) => {
      console.log('Error getting student info from DB: ', error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const data = req.body;
  const password = encryptLib.encryptPassword(req.body.password);
  const role_id = 3;
  const school = 1;
  console.log(data);
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
    .then((result) => {
      const nextSQL = `INSERT INTO student_courses (points, student_id, course) 
     VALUES ($1, $2, $3)`;
      const createdStudentID = result.rows[0].id;
      const courseID = req.body.course_id;
      pool.query(nextSQL, [0, createdStudentID, courseID]);
    })
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error posting to the DB for student on server:', error);
      res.sendStatus(500);
    });
});

router.put('/id', rejectUnauthenticated, (req, res) => {
  console.log('in put route', req.body, req.body.id);
  const data = req.body;
  const id = req.body.id;
  const sqlText = `UPDATE courses SET start_date = $1, end_date = $2, course_name = $3, teacher_id=$4,
  WHERE id = ${id} `;
  pool
    .query(sqlText, [
      data.startDate,
      data.endDate,
      data.className,
      Number(req.user.id),
    ])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Error on server updating student: ', error);
      res.sendStatus(500);
    });
});

module.exports = router;
