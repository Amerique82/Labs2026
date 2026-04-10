// Lab 11 - Passwords and Authentication
// Run: node server.js → http://localhost:4000

const express = require('express');
const session = require('express-session');
const UserModel = require('./models/UserModel');

const app = express();
const port = 4000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
    secret: 'lab11-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// ---------------------------
// Authentication middleware
// Protects routes — redirects to /login if not logged in
// ---------------------------
function requireLogin(req, res, next) {
    if (req.session.user) {
        next(); // user is logged in, continue
    } else {
        res.redirect('/login');
    }
}

// ---------------------------
// Public routes (no login needed)
// ---------------------------

// GET /login
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// POST /login — authenticate user
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.authenticate(email, password, (err, user) => {
        if (err) return res.status(500).send(err.message);
        if (!user) {
            // Wrong email or password
            return res.render('login', {
                title: 'Login',
                error: 'Invalid email or password. Please try again.'
            });
        }
        // Save user in session and redirect to home
        req.session.user = { id: user.id, email: user.email };
        res.redirect('/');
    });
});

// GET /register
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// POST /register — create new user
app.post('/register', (req, res) => {
    const { email, password, confirm } = req.body;

    if (password !== confirm) {
        return res.render('register', {
            title: 'Register',
            error: 'Passwords do not match.'
        });
    }

    UserModel.create(email, password, (err) => {
        if (err) {
            return res.render('register', {
                title: 'Register',
                error: 'Email already in use.'
            });
        }
        res.redirect('/login');
    });
});

// GET /logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// ---------------------------
// Protected routes (login required)
// ---------------------------

app.get('/', requireLogin, (req, res) => {
    res.render('index', { title: 'Home', user: req.session.user });
});

app.get('/dashboard', requireLogin, (req, res) => {
    res.render('dashboard', { title: 'Dashboard', user: req.session.user });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Test login: admin@roehampton.ac.uk / password123`);
});
