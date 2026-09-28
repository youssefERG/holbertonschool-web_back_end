const express = require('express');
const fs = require('fs');

const app = express();
const database = process.argv[2];

function getStudents() {
  return new Promise((resolve, reject) => {
    fs.readFile(database, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const students = data
        .split('\n')
        .slice(1)
        .filter((line) => line.trim());

      const fields = {};

      students.forEach((student) => {
        const values = student.split(',');
        const firstName = values[0];
        const field = values[3];

        if (!fields[field]) {
          fields[field] = [];
        }

        fields[field].push(firstName);
      });

      let result = `Number of students: ${students.length}`;

      Object.keys(fields).forEach((field) => {
        const names = fields[field];
        result += `\nNumber of students in ${field}: ${names.length}. List: ${names.join(', ')}`;
      });

      resolve(result);
    });
  });
}

app.get('/', (request, response) => {
  response.type('text/plain');
  response.send('Hello Holberton School!');
});

app.get('/students', (request, response) => {
  getStudents()
    .then((students) => {
      response.type('text/plain');
      response.send(`This is the list of our students\n${students}`);
    })
    .catch((error) => {
      response.type('text/plain');
      response.send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(1245);

module.exports = app;
