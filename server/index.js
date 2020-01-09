const express = require('express');
const app = express();
const fs = require('fs');
const gradesObj = require('../database/data.json');

const errors = [
  { Error: 'Can not find note with that id' },
  { Error: 'Id must be positive integer' },
  { Error: 'An unexpected error occurred.' },
  { Error: 'content is a required field' },
  { Error: 'An unexpected error occurred' }
];

app.get('/api/grades', (req, res) => {
  res.json(gradesObj);
});

app.use(express.json());

app.post('/api/grades', (req, res) => {
  const nextId = gradesObj.nextId - 1;
  gradesObj.grades.push(req.body);
  gradesObj.grades[nextId].id = gradesObj.nextId;
  fs.writeFile(
    '../database/data.json',
    JSON.stringify(gradesObj, null, 2),
    err => {
      if (err) {
        res.status(500).send(errors[4]);
        console.error(err);
      } else {
        res.status(201).send(gradesObj.grades[nextId]);
        gradesObj.nextId++;
      }
    });

});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express Server Listening on Port 3000!');
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
