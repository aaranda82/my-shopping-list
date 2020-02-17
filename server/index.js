require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database');
var knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

app.get('/api/health-check', (req, res, next) => {
  console.log('***here')
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/grades', async (req, res, next) => {
  try {
    const grades = await knex('students').join('course', 'course.courseid', '=', 'students.courseid');
    console.log(grades)
    res.json(grades);
  } catch (error) {
    console.error(error);
  }
});

app.use(express.json());

app.post('/api/grades', async (req, res, next) => {
  let { name, course, grade } = req.body;
  grade = parseInt(grade);
  try {
    const courseSearchId = await knex('course').select('courseid').where('course', '=', course);
    if (courseSearchId.length === 0) {
      const courseInsertId = await knex('course').insert({ course: course }, 'courseid');
      const studentInsert = await knex('students').insert({
        name,
        courseid: courseInsertId[0],
        grade
      }, 'studentid');
      const studentSearch = await knex('students').join('course', 'course.courseid', '=', 'students.courseid').where('studentid', '=', studentInsert[0]);
      res.json(studentSearch[0]);
    } else {
      const studentInsert = await knex('students').insert({
        name,
        courseid: courseSearchId[0].courseid,
        grade
      }, 'studentid');
      const studentSearch = await knex('students').join('course', 'course.courseid', '=', 'students.courseid').where('studentid', '=', studentInsert[0]);
      res.json(studentSearch[0]);
    }
  } catch (error) {
    console.error(error);
  }
});

app.delete('/api/grades/:id', async (req, res, next) => {
  try {
    const studentToDelete = await knex('students').where('studentid', '=', req.params.id).del();
    res.json(req.params.id);
  } catch (error) {
    console.error(error);
  }
});

app.put('/api/grades/:id', async (req, res, next) => {
  let { name, course, grade } = req.body;
  grade = parseInt(grade);
  const id = req.params.id;
  try {
    const courseSearchId = await knex('course').select('courseid').where('course', '=', course);
    if (courseSearchId.length === 0) {
      const courseInsertId = await knex('course').insert({ course: course }, 'courseid');
      const studentToUpdate = await knex('students').where('studentid', '=', id).update({
        name,
        grade,
        courseid: courseInsertId[0]
      });
    } else {
      const studentToUpdate = await knex('students').where('studentid', '=', id).update({
        name,
        grade,
        courseid: courseSearchId[0].courseid
      });
    }
    const studentSearch = await knex('students').join('course', 'course.courseid', '=', 'students.courseid').where('studentid', '=', id);
    res.json(studentSearch[0]);
  } catch (error) {
    console.error(error);
  }
});

app.listen(3002, () => {
  // eslint-disable-next-line no-console
  console.log('Express Server Listening on Port 3002');
});
