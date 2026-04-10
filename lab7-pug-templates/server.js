// Lab 7 - Express + Pug templates + MySQL
// Run: node server.js
// Visit: http://localhost:4000

const express = require('express');
const db = require('./db');

const app = express();
const port = 4000;

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ---------------------------
// GET / — home page
// ---------------------------
app.get('/', (req, res) => {
    res.render('index', { title: 'Lab 7 - Pug Templates' });
});

// ---------------------------
// GET /students — list all students from DB
// ---------------------------
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.render('students', { title: 'Students', students: results });
    });
});

// ---------------------------
// GET /students/:id — one student
// ---------------------------
app.get('/students/:id', (req, res) => {
    db.query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, results) => {
        if (err) return res.status(500).send(err.message);
        if (results.length === 0) return res.status(404).render('404', { title: 'Not Found' });
        res.render('student', { title: results[0].name, student: results[0] });
    });
});

// ---------------------------
// GET /students/add — show add form
// ---------------------------
app.get('/students/add', (req, res) => {
    res.render('add-student', { title: 'Add Student' });
});

// ---------------------------
// POST /students/add — save new student
// ---------------------------
app.post('/students/add', (req, res) => {
    const { name, course, email } = req.body;
    db.query(
        'INSERT INTO students (name, course, email) VALUES (?, ?, ?)',
        [name, course, email],
        (err) => {
            if (err) return res.status(500).send(err.message);
            res.redirect('/students');
        }
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
