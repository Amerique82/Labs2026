// Run this script once to create the students table and add some test data
// Usage: node addtable.js

const db = require('./db');

const createTable = `
    CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        course VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

const insertData = `
    INSERT INTO students (name, course, email) VALUES
    ('Amerique', 'Software Development', 'amerique@roehampton.ac.uk'),
    ('John Smith', 'Computer Science', 'john@roehampton.ac.uk'),
    ('Maria Garcia', 'Information Technology', 'maria@roehampton.ac.uk')
`;

db.query(createTable, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
        process.exit(1);
    }
    console.log('Table "students" created (or already exists).');

    db.query(insertData, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err.message);
        } else {
            console.log(`Inserted ${results.affectedRows} rows.`);
        }
        db.end();
        console.log('Done! Now run: node server.js');
    });
});
