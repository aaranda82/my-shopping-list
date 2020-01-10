const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const gradesObj = require('../database/data.json');
const currentGrades = gradesObj.grades;
const dbPath = path.resolve(__dirname, '../database/data.json');

const errors = [
  { Error: 'Can not find note with that id' },
  { Error: 'Id must be positive integer' },
  { Error: 'A "name" is required' },
  { Error: 'Content is a required field' },
  { Error: 'An unexpected error occurred' },
  { Error: 'A "course" is required' },
  { Error: 'A "grade" is required' },
  { Error: 'Grade must be a number ranging from 0 and 100' }
];

app.get('/api/grades', (req, res) => {
  res.json(gradesObj);
});

app.use(express.json());

app.post('/api/grades', (req, res) => {
  const gradeToPost = req.body;
  if (!gradeToPost.name) {
    res.status(400).send(errors[2]);
  }
  if (!gradeToPost.course) {
    res.status(400).send(errors[5]);
  }
  if (!gradeToPost.grade) {
    res.status(400).send(errors[6]);
  } else if (gradeToPost.grade < 0 || gradeToPost.grade > 100 || typeof gradeToPost.grade === 'number') {
    res.status(400).send(errors[7]);
  }
  gradeToPost.grade = parseInt(gradeToPost.grade);
  gradeToPost.id = gradesObj.nextId;
  currentGrades.push(gradeToPost);
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
  const indexToUpdate = currentGrades.findIndex(element => parseInt(element.id) === parseInt(req.params.id));
  currentGrades.splice(indexToUpdate, 1);
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
  const indexToUpdate = currentGrades.findIndex(element => parseInt(element.id) === parseInt(req.params.id));
  if (req.body.name) {
    currentGrades[indexToUpdate].name = req.body.name;
  }
  if (req.body.course) {
    currentGrades[indexToUpdate].course = req.body.course;
  }
  if (req.body.grade) {
    currentGrades[indexToUpdate].grade = parseInt(req.body.grade);
  }
  currentGrades[indexToUpdate].id = parseInt(req.params.id);
  fs.writeFile(
    dbPath,
    JSON.stringify(gradesObj, null, 2),
    err => {
      if (err) {
        res.status(500).send(errors[4]);
        console.error(err);
      } else {
        res.status(204).send(currentGrades[indexToUpdate]);
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
