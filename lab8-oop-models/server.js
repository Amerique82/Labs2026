// Lab 8 - MVC with OOP Models
// Run: node server.js  →  http://localhost:4000

const express = require('express');
const StudentModel = require('./models/StudentModel');
const ProgrammeModel = require('./models/ProgrammeModel');

const app = express();
const port = 4000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ---------------------------
// Home
// ---------------------------
app.get('/', (req, res) => {
    res.render('index', { title: 'Lab 8 - OOP Models' });
});

// ---------------------------
// Students (using StudentModel)
// ---------------------------
app.get('/students', (req, res) => {
    const model = new StudentModel();
    model.get(null, (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.render('students', { title: 'All Students', students: rows });
    });
});

app.get('/student/:id', (req, res) => {
    const model = new StudentModel();
    model.get(req.params.id, (err, rows) => {
        if (err) return res.status(500).send(err.message);
        if (!rows.length) return res.status(404).render('404', { title: 'Not Found' });
        res.render('student', { title: rows[0].name, student: rows[0] });
    });
});

app.get('/students/add', (req, res) => {
    res.render('add-student', { title: 'Add Student' });
});

app.post('/students/add', (req, res) => {
    const model = new StudentModel();
    model.insert(req.body, (err) => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/students');
    });
});

app.post('/student/:id/delete', (req, res) => {
    const model = new StudentModel();
    model.remove(req.params.id, (err) => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/students');
    });
});

// ---------------------------
// Programmes (using ProgrammeModel)
// ---------------------------
app.get('/programmes', (req, res) => {
    const model = new ProgrammeModel();
    model.get(null, (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.render('programmes', { title: 'All Programmes', programmes: rows });
    });
});

app.get('/programme/:id', (req, res) => {
    const progModel = new ProgrammeModel();
    progModel.get(req.params.id, (err, rows) => {
        if (err) return res.status(500).send(err.message);
        if (!rows.length) return res.status(404).render('404', { title: 'Not Found' });
        const programme = rows[0];
        progModel.getStudents(req.params.id, (err, students) => {
            if (err) return res.status(500).send(err.message);
            res.render('programme', { title: programme.name, programme, students });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
