const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
/**
 * GET route template
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  console.log('this is working', id);
  let sqlText = `SELECT first_name, last_name, email, points FROM student_courses
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
router.post('/', (req, res) => {
  let data = req.body;
  console.log(data);
  const sqlText = `
  INSERT INTO courses (start_date, end_date, course_name, teacher_id,  coteacher_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING id;`;

  pool
    .query(sqlText, [
      data.startDate,
      data.endDate,
      data.className,
      Number(req.user.id),
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error posting to the DB for student on server:', error);
      res.sendStatus(500);
    });
});

router.put('/id', (req, res) => {
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
