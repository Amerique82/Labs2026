// Run once: node addtable.js
const db = require('./db');

const queries = [
    `CREATE TABLE IF NOT EXISTS programmes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(20) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS modules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        code VARCHAR(20) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        programme_id INT,
        FOREIGN KEY (programme_id) REFERENCES programmes(id)
    )`,
    `CREATE TABLE IF NOT EXISTS programme_module (
        programme_id INT,
        module_id INT,
        PRIMARY KEY (programme_id, module_id)
    )`,
    `INSERT IGNORE INTO programmes (id, name, code) VALUES
        (1, 'Software Development', 'SD101'),
        (2, 'Computer Science', 'CS101')`,
    `INSERT IGNORE INTO modules (id, name, code) VALUES
        (1, 'Web Development', 'WD101'),
        (2, 'Databases', 'DB101'),
        (3, 'Algorithms', 'AL101')`,
    `INSERT IGNORE INTO programme_module (programme_id, module_id) VALUES
        (1, 1), (1, 2), (2, 2), (2, 3)`,
    `INSERT IGNORE INTO students (id, name, email, programme_id) VALUES
        (1, 'Amerique', 'amerique@roehampton.ac.uk', 1),
        (2, 'John Smith', 'john@roehampton.ac.uk', 2),
        (3, 'Maria Garcia', 'maria@roehampton.ac.uk', 1)`
];

let done = 0;
queries.forEach((sql, i) => {
    db.query(sql, err => {
        if (err) console.error(`Query ${i+1} error:`, err.message);
        else console.log(`Query ${i+1} done.`);
        if (++done === queries.length) { db.end(); console.log('Done! Run: node server.js'); }
    });
});
