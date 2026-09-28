const http = require('http');
const fs = require('fs');

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

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });

  if (request.url === '/') {
    response.end('Hello Holberton School!');
  } else if (request.url === '/students') {
    response.write('This is the list of our students\n');

    getStudents()
      .then((students) => {
        response.end(students);
      })
      .catch((error) => {
        response.end(error.message);
      });
  } else {
    response.end('Hello Holberton School!');
  }
});

app.listen(1245);

module.exports = app;
