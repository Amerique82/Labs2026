// Run once: node addtable.js
const db = require('./db');
const bcrypt = require('bcrypt');

const hashedPassword = bcrypt.hashSync('password123', 10);

const queries = [
    `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    `INSERT IGNORE INTO users (email, password) VALUES
        ('admin@roehampton.ac.uk', '${hashedPassword}'),
        ('student@roehampton.ac.uk', '${hashedPassword}')`
];

let done = 0;
queries.forEach((sql, i) => {
    db.query(sql, err => {
        if (err) console.error(`Query ${i+1} error:`, err.message);
        else console.log(`Query ${i+1} done.`);
        if (++done === queries.length) {
            db.end();
            console.log('Done! Test credentials: admin@roehampton.ac.uk / password123');
            console.log('Run: node server.js');
        }
    });
});
