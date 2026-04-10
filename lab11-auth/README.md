# Lab 11 - Passwords and Authentication

## What this lab covers
Password hashing with bcrypt, session-based authentication with express-session, and protecting routes.

## Files

| File | Description |
|------|-------------|
| `server.js` | Express server with login/register/logout routes + `requireLogin` middleware |
| `models/UserModel.js` | `getByEmail`, `hashPassword`, `checkPassword`, `create`, `authenticate` |
| `views/login.pug` | Login form with error display |
| `views/register.pug` | Register form with password confirmation |
| `views/index.pug` | Protected home page |
| `views/dashboard.pug` | Protected dashboard showing session data |
| `addtable.js` | Creates users table and seeds test users |

## How to run
```bash
cd ../lab6-express-mysql && docker-compose up -d db
cd ../lab11-auth
npm install
node addtable.js
node server.js
```
Visit: http://localhost:4000

Test credentials: `admin@roehampton.ac.uk` / `password123`

## Key concepts

### bcrypt — password hashing
```javascript
// NEVER store plain text passwords
bcrypt.hashSync('mypassword', 10)    // hash it (10 = salt rounds)
bcrypt.compareSync('mypassword', hash) // verify it
```

### express-session — sessions
```javascript
app.use(session({ secret: 'key', resave: false, saveUninitialized: false }))
req.session.user = { id, email }  // save to session after login
req.session.destroy()             // clear on logout
```

### requireLogin middleware
```javascript
function requireLogin(req, res, next) {
    if (req.session.user) next();   // logged in → continue
    else res.redirect('/login');    // not logged in → redirect
}
app.get('/protected', requireLogin, (req, res) => { ... })
```

| Route | Method | Protected | What it does |
|-------|--------|-----------|-------------|
| `/login` | GET | No | Show login form |
| `/login` | POST | No | Authenticate user |
| `/register` | GET | No | Show register form |
| `/register` | POST | No | Create new user |
| `/logout` | GET | No | Destroy session |
| `/` | GET | Yes | Home page |
| `/dashboard` | GET | Yes | Dashboard |
