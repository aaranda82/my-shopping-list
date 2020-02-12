require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database');

const errors = [
  { Error: 'Can not find note with that id' },
  { Error: 'Id must be positive integer' },
  { Error: 'A "name" is required' },
  { Error: 'Content is a required field' },
  { Error: 'An unexpected error occurred' },
  { Error: 'A "course" is required' },
  { Error: 'Grade must be a number between 0 and 100' }
];

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/grades', (req, res, next) => {
  const sql = `select *
                from  "students"
                join "course" using ("courseid")`;
  db.query(sql)
    .then(response => res.json(response.rows))
    .catch(err => next(err));
});

app.use(express.json());

app.post('/api/grades', (req, res, next) => {
  let { name, course, grade } = req.body;
  grade = parseInt(grade);
  if (!name) {
    res.status(400).send(errors[2]);
  } else if (!course) {
    res.status(400).send(errors[5]);
  } else if (!grade || grade < 0 || grade > 100 || typeof grade !== 'number') {
    return res.status(400).send(errors[6]);
  }
  const sql = `select "courseid"
                 from "course"
                where "course" = $1`;
  const value = [course];
  db.query(sql, value)
    .then(response => response.rows[0])
    .then(resCourse => {
      if (!resCourse) {
        const sql = `insert into "course" ("course")
                          values ($1)
                       returning *`;
        const val = [course];
        db.query(sql, val)
          .then(response => {
            const courseId = response.rows[0].courseid;
            const sqlInsertStudent = `insert into "students" ("name", "courseid", "grade")
                                           values ($1, $2, $3)
                                        returning *`;
            const valInsertStudent = [name, courseId, grade];
            db.query(sqlInsertStudent, valInsertStudent)
              .then(response => response.rows[0])
              .then(newGrade => {
                const sql = `select *
                            from "students"
                            join "course" using ("courseid")
                            where "studentid" = $1`;
                const val = [newGrade.studentid];
                db.query(sql, val)
                  .then(response => {
                    res.json(response.rows[0]);
                  })
                  .catch(err => next(err));
              })
              .catch(err => next(err));
          })
          .catch(err => next(err));
      } else {
        const sql = `insert into "students" ("name", "courseid", "grade")
                          values ($1, $2, $3)
                       returning *`;
        const val = [name, resCourse.courseid, grade];
        db.query(sql, val)
          .then(response => response.rows[0])
          .then(newGrade => {
            const sql = `select *
                           from "students"
                           join "course" using ("courseid")
                          where "studentid" = $1`;
            const val = [newGrade.studentid];
            db.query(sql, val)
              .then(response => {
                res.json(response.rows[0]);
              })
              .catch(err => next(err));
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

app.delete('/api/grades/:id', (req, res, next) => {
  const sql = `delete from "students"
                     where "studentid" = $1
                 returning *`;
  const val = [req.params.id];
  db.query(sql, val)
    .then(response => res.json(response.rows[0]))
    .catch(err => next(err));
});

app.put('/api/grades/:id', (req, res, next) => {
  const { name, course, grade } = req.body;
  const id = req.params.id;
  const sql = `select "courseid"
                 from "course"
                where "course" = $1`;
  const value = [course];
  db.query(sql, value)
    .then(response => response.rows[0])
    .then(resCourse => {
      if (!resCourse) {
        const sql = `insert into "course" ("course")
                          values ($1)
                       returning *`;
        const val = [course];
        db.query(sql, val)
          .then(response => {
            const courseId = response.rows[0].courseid;
            const sql = `update "students"
                            set "name" = $1,
                                "grade" = $2,
                                "courseid" = $3
                          where "studentid" = $4
                      returning *`;
            const val = [name, grade, courseId, id];
            db.query(sql, val)
              .then(response => response)
              .catch(err => next(err));
          });
      } else {
        const sql = `update "students"
                        set "name" = $1,
                            "grade" = $2,
                            "courseid" = $3
                      where "studentid" = $4
                  returning *`;
        const val = [name, grade, resCourse.courseid, id];
        db.query(sql, val)
          .then(response => response)
          .catch(err => next(err));
      }
      const sql = `select *
                     from "students"
                     join "course" using ("courseid")
                    where "studentid" = $1`;
      const val = [id];
      db.query(sql, val)
        .then(response => {
          res.json(response.rows[0]);
        })
        .catch(err => next(err));
    });
});

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Express Server Listening on Port 3001!');
});
