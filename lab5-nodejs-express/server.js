// Lab 5 - Part 2: Express.js server
// Run with: node server.js
// Then visit: http://localhost:3000

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' folder
// e.g. http://localhost:3000/index.html
app.use(express.static('public'));

// ---------------------------
// Basic routes
// ---------------------------

// GET /  -> Hello World
app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});

// Exercise: GET /goodbye
app.get('/goodbye', (req, res) => {
    res.send('Goodbye! See you next time.');
});

// ---------------------------
// Dynamic routes
// ---------------------------

// GET /user/:name  -> greet by name
// Example: http://localhost:3000/user/Amerique
app.get('/user/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hello, ${name}! Welcome to the server.`);
});

// ---------------------------
// RESTful API routes
// ---------------------------

// In-memory data store (no database yet)
let students = [
    { id: 1, name: 'Amerique', course: 'Software Development' },
    { id: 2, name: 'John Smith', course: 'Computer Science' }
];

// GET /api/students  -> return all students
app.get('/api/students', (req, res) => {
    res.json(students);
});

// GET /api/students/:id  -> return one student by id
app.get('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
});

// POST /api/students  -> add a new student
app.post('/api/students', (req, res) => {
    const { name, course } = req.body;
    const newStudent = {
        id: students.length + 1,
        name,
        course
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// DELETE /api/students/:id  -> remove a student
app.delete('/api/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(s => s.id !== id);
    res.json({ message: `Student ${id} deleted` });
});

// ---------------------------
// Start server
// ---------------------------
app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}`);
    console.log(`Try these routes:`);
    console.log(`  http://localhost:${port}/`);
    console.log(`  http://localhost:${port}/goodbye`);
    console.log(`  http://localhost:${port}/user/Amerique`);
    console.log(`  http://localhost:${port}/api/students`);
});
