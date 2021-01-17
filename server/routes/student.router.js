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

router.get('/point/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  let sqlText = `UPDATE student_courses SET points = points + 1 WHERE student_id = $1`;
  pool
    .query(sqlText, [id])
    .then((result) => res.send(result.rows[0]))
    .catch((error) => {
      console.log('Error adding points to student info in the DB: ', error);
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

router.put('/id', rejectUnauthenticated, (req, res) => {
  console.log('in put route', req.body);
  const data = req.body;
  const id = req.body.id;
  const sqlText = `UPDATE person SET first_name = $1, last_name = $2, email = $3, start_date=$4, avatar=$5
  WHERE person.id = ${id} `;
  pool
    .query(sqlText, [
      data.first_name,
      data.last_name,
      data.email,
      data.start_date,
      data.avatar,
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
  const sqlText = `DELETE FROM person WHERE id=$1`;
  pool
    .query(sqlText, [id])
    .then((result) => res.sendStatus(204))
    .catch((error) => {
      console.log('Error on server deleting student: ', error);
      res.sendStatus(500);
    });
});

module.exports = router;
