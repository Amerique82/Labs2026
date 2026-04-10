// Lab 10 - Adding and Changing Data via Web Front End
// Run: node server.js → http://localhost:4000

const express = require('express');
const StudentModel = require('./models/StudentModel');
const ProgrammeModel = require('./models/ProgrammeModel');

const app = express();
const port = 4000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home
app.get('/', (req, res) => res.render('index', { title: 'Lab 10 - User Input' }));

// All students
app.get('/students', (req, res) => {
    const model = new StudentModel();
    model.get(null, (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.render('students', { title: 'All Students', students: rows });
    });
});

// Single student
app.get('/student/:id', (req, res) => {
    const model = new StudentModel();
    model.get(req.params.id, (err, rows) => {
        if (err) return res.status(500).send(err.message);
        if (!rows.length) return res.status(404).render('404', { title: 'Not Found' });
        res.render('student', { title: rows[0].name, student: rows[0] });
    });
});

// GET /students/add — show add form with list of programmes
app.get('/students/add', (req, res) => {
    const progModel = new ProgrammeModel();
    progModel.get(null, (err, programmes) => {
        if (err) return res.status(500).send(err.message);
        res.render('add-student', { title: 'Add Student', programmes });
    });
});

// POST /students/add — save new student to database
app.post('/students/add', (req, res) => {
    const { name, email, programme_id } = req.body;
    const model = new StudentModel();
    model.insert({ name, email, programme_id: programme_id || null }, (err) => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/students');
    });
});

// GET /student/:id/edit — show form to change programme
app.get('/student/:id/edit', (req, res) => {
    const studentModel = new StudentModel();
    const progModel = new ProgrammeModel();
    studentModel.get(req.params.id, (err, rows) => {
        if (err) return res.status(500).send(err.message);
        if (!rows.length) return res.status(404).render('404', { title: 'Not Found' });
        progModel.get(null, (err, programmes) => {
            if (err) return res.status(500).send(err.message);
            res.render('edit-student', {
                title: 'Edit Student',
                student: rows[0],
                programmes
            });
        });
    });
});

// POST /student/:id/edit — update student's programme in database
app.post('/student/:id/edit', (req, res) => {
    const { programme_id } = req.body;
    const model = new StudentModel();
    model.updateById(req.params.id, { programme_id }, (err) => {
        if (err) return res.status(500).send(err.message);
        res.redirect(`/student/${req.params.id}`);
    });
});

// POST /student/:id/delete
app.post('/student/:id/delete', (req, res) => {
    const model = new StudentModel();
    model.remove(req.params.id, (err) => {
        if (err) return res.status(500).send(err.message);
        res.redirect('/students');
    });
});

app.listen(port, () => console.log(`Server at http://localhost:${port}`));
