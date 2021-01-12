const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  let sqlText = `SELECT SUM(course) as student_total, courses.id, person.last_name, courses.course_name, courses.start_date, courses.end_date, courses.coteacher_id
  FROM student_courses
  JOIN courses on student_courses.id = courses.id
  JOIN person on courses.teacher_id = person.id
  WHERE person.id = $1
  GROUP BY courses.id, person.last_name, courses.course_name, courses.start_date, courses.end_date, courses.coteacher_id`;
  pool
    .query(sqlText, [req.user.id])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log('Error getting class info from DB: ', err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
