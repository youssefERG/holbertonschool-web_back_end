const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const students = data
        .trim()
        .split('\n')
        .slice(1)
        .filter((line) => line);

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

      console.log(`Number of students: ${students.length}`);

      Object.keys(fields).forEach((field) => {
        const names = fields[field];
        console.log(
          `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`
        );
      });

      resolve();
    });
  });
}

module.exports = countStudents;