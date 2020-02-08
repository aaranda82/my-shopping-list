const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const gradesObj = require('../database/data.json');
const DBGrades = gradesObj.grades;
const dbPath = path.resolve(__dirname, '../database/data.json');

const errors = [
  { Error: 'Can not find note with that id' },
  { Error: 'Id must be positive integer' },
  { Error: 'A "name" is required' },
  { Error: 'Content is a required field' },
  { Error: 'An unexpected error occurred' },
  { Error: 'A "course" is required' },
  { Error: 'Grade must be a number between 0 and 100' }
];

app.get('/api/grades', (req, res) => {
  res.json(gradesObj.grades);
});

app.use(express.json());

app.post('/api/grades', (req, res) => {
  const gradeToPost = req.body;
  if (!gradeToPost.name) {
    res.status(400).send(errors[2]);
  } else if (!gradeToPost.course) {
    res.status(400).send(errors[5]);
  } else if (!gradeToPost.grade || gradeToPost.grade < 0 || gradeToPost.grade > 100 || typeof gradeToPost.grade !== 'number') {
    return res.status(400).send(errors[6]);
  }
  gradeToPost.grade = parseInt(gradeToPost.grade);
  gradeToPost.id = gradesObj.nextId;
  DBGrades.push(gradeToPost);
  gradesObj.nextId++;
  fs.writeFile(
    dbPath,
    JSON.stringify(gradesObj, null, 2),
    err => {
      if (err) {
        res.status(500).send(errors[4]);
        console.error(err);
      } else {
        res.status(201).send(gradeToPost);
      }
    });
});

app.delete('/api/grades/:id', (req, res) => {
  const indexToUpdate = DBGrades.findIndex(element => parseInt(element.id) === parseInt(req.params.id));
  DBGrades.splice(indexToUpdate, 1);
  fs.writeFile(
    dbPath,
    JSON.stringify(gradesObj, null, 2),
    err => {
      if (err) {
        res.status(500).send(errors[4]);
        console.error(err);
      } else {
        res.status(204).send('');
      }
    }
  );
});

app.put('/api/grades/:id', (req, res) => {
  const indexToUpdate = DBGrades.findIndex(element => parseInt(element.id) === parseInt(req.params.id));
  const { name, course, grade } = req.body;
  if (name && course && grade) {
    DBGrades[indexToUpdate].name = req.body.name;
    DBGrades[indexToUpdate].course = req.body.course;
    DBGrades[indexToUpdate].grade = parseInt(req.body.grade);
    DBGrades[indexToUpdate].id = parseInt(req.params.id);
  }
  fs.writeFile(
    dbPath,
    JSON.stringify(gradesObj, null, 2),
    err => {
      if (err) {
        res.status(500).send(errors[4]);
        return console.error(err);
      } else {
        console.log(DBGrades[indexToUpdate]);
        res.status(204).json(DBGrades[indexToUpdate]);
      }
    }
  );
});

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Express Server Listening on Port 3001!');
});

// const path = require('path');
// const jsonServer = require('json-server');

// const dbPath = path.resolve(__dirname, '../database/db.json');
// const server = jsonServer.create();
// const middleware = jsonServer.defaults();
// const endpoints = jsonServer.router(dbPath);

// server.use(middleware);
// server.use('/api', endpoints);
// server.listen(3001, () => {
//   // eslint-disable-next-line no-console
//   console.log('JSON Server listening on port 3001\n');
// });
