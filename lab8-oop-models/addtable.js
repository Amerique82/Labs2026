// Run once to set up tables and seed data
// Usage: node addtable.js

const db = require('./db');

const queries = [
    `CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        course VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `CREATE TABLE IF NOT EXISTS programmes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(20) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS student_programme (
        student_id INT,
        programme_id INT,
        PRIMARY KEY (student_id, programme_id)
    )`,
    `INSERT IGNORE INTO students (id, name, course, email) VALUES
        (1, 'Amerique', 'Software Development', 'amerique@roehampton.ac.uk'),
        (2, 'John Smith', 'Computer Science', 'john@roehampton.ac.uk'),
        (3, 'Maria Garcia', 'Information Technology', 'maria@roehampton.ac.uk')`,
    `INSERT IGNORE INTO programmes (id, name, code) VALUES
        (1, 'Software Development', 'SD101'),
        (2, 'Computer Science', 'CS101')`,
    `INSERT IGNORE INTO student_programme (student_id, programme_id) VALUES
        (1, 1), (2, 2), (3, 1)`
];

let completed = 0;
queries.forEach((sql, i) => {
    db.query(sql, (err) => {
        if (err) console.error(`Query ${i + 1} error:`, err.message);
        else console.log(`Query ${i + 1} done.`);
        completed++;
        if (completed === queries.length) {
            console.log('All tables created and seeded. Run: node server.js');
            db.end();
        }
    });
});
