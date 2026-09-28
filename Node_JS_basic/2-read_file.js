const fs = require('fs');

function countStudents(path) {
  let data;

  try {
    data = fs.readFileSync(path, 'utf-8');
  } catch (error) {
    throw new Error('Cannot load the database');
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
}

module.exports = countStudents;
