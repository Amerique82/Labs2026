// Lab 9 - Models and Controllers
// Run: node server.js → http://localhost:4000

const express = require('express');
const StudentModel = require('./models/StudentModel');
const ProgrammeModel = require('./models/ProgrammeModel');
const ModuleModel = require('./models/ModuleModel');

const app = express();
const port = 4000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home
app.get('/', (req, res) => res.render('index', { title: 'Lab 9 - Models & Controllers' }));

// All students (with programme name from JOIN)
app.get('/students', (req, res) => {
    const model = new StudentModel();
    model.get(null, (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.render('students', { title: 'All Students', students: rows });
    });
});

// Single student — also shows their programme name
app.get('/student/:id', (req, res) => {
    const studentModel = new StudentModel();
    studentModel.get(req.params.id, (err, rows) => {
        if (err) return res.status(500).send(err.message);
        if (!rows.length) return res.status(404).render('404', { title: 'Not Found' });
        const student = rows[0];
        // Also get modules for their programme
        const progModel = new ProgrammeModel();
        progModel.getProgrammingLanguages(student.programme_id, (err, modules) => {
            if (err) return res.status(500).send(err.message);
            res.render('student', { title: student.name, student, modules });
        });
    });
});

// Delete student
app.post('/student/:id/delete', (req, res) => {
    const model = new StudentModel();
    model.remove(req.params.id, (err) => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/students');
    });
});

// All programmes
app.get('/programmes', (req, res) => {
    const model = new ProgrammeModel();
    model.get(null, (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.render('programmes', { title: 'All Programmes', programmes: rows });
    });
});

// Single programme — shows modules (getProgrammingLanguages) and students
app.get('/programme/:id', (req, res) => {
    const progModel = new ProgrammeModel();
    progModel.get(req.params.id, (err, rows) => {
        if (err) return res.status(500).send(err.message);
        if (!rows.length) return res.status(404).render('404', { title: 'Not Found' });
        const programme = rows[0];
        progModel.getProgrammingLanguages(req.params.id, (err, modules) => {
            if (err) return res.status(500).send(err.message);
            progModel.getStudents(req.params.id, (err, students) => {
                if (err) return res.status(500).send(err.message);
                res.render('programme', { title: programme.name, programme, modules, students });
            });
        });
    });
});

app.listen(port, () => console.log(`Server at http://localhost:${port}`));
