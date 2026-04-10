// Lab 6 - Express.js + MySQL
// Run with: node server.js
// Visit:    http://localhost:4000

const express = require('express');
const db = require('./db');

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static('public'));

// ---------------------------
// GET / — home
// ---------------------------
app.get('/', (req, res) => {
    res.send('Lab 6 - Express + MySQL is running! Visit /api/students');
});

// ---------------------------
// GET /api/students — all students from DB
// ---------------------------
app.get('/api/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// ---------------------------
// GET /api/students/:id — one student by id
// ---------------------------
app.get('/api/students/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM students WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Student not found' });
        res.json(results[0]);
    });
});

// ---------------------------
// POST /api/students — add a new student
// ---------------------------
app.post('/api/students', (req, res) => {
    const { name, course, email } = req.body;
    db.query(
        'INSERT INTO students (name, course, email) VALUES (?, ?, ?)',
        [name, course, email],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: results.insertId, name, course, email });
        }
    );
});

// ---------------------------
// DELETE /api/students/:id — remove a student
// ---------------------------
app.delete('/api/students/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM students WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: `Student ${id} deleted`, affectedRows: results.affectedRows });
    });
});

// ---------------------------
// Start server
// ---------------------------
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Routes:`);
    console.log(`  GET    http://localhost:${port}/api/students`);
    console.log(`  GET    http://localhost:${port}/api/students/:id`);
    console.log(`  POST   http://localhost:${port}/api/students`);
    console.log(`  DELETE http://localhost:${port}/api/students/:id`);
});
