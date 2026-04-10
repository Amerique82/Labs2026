# Lab 8 - Building out Models using OOP

## What this lab covers
Refactoring Express + MySQL code to follow the MVC (Model-View-Controller) pattern using OOP classes.

## Files

| File | Layer | Description |
|------|-------|-------------|
| `models/StudentModel.js` | Model | Class with get, insert, remove, update methods |
| `models/ProgrammeModel.js` | Model | Class with get, getStudents, insert, remove methods |
| `server.js` | Controller | Express routes that use the models |
| `views/*.pug` | View | Pug templates that render HTML |
| `db.js` | - | MySQL connection |
| `addtable.js` | - | Creates tables and seeds test data |

## How to run

Requires MySQL from Lab 6:
```bash
cd ../lab6-express-mysql
docker-compose up -d db
cd ../lab8-oop-models
npm install
node addtable.js
node server.js
```
Visit: http://localhost:4000

## MVC pattern explained

```
Browser → Route (Controller) → Model → Database
                ↓
            View (Pug)
                ↓
           Browser (HTML)
```

**Before (Lab 7 — mixed):**
```javascript
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {  // SQL in route!
        res.render('students', { students: results });
    });
});
```

**After (Lab 8 — MVC):**
```javascript
app.get('/students', (req, res) => {
    const model = new StudentModel();
    model.get(null, (err, rows) => {        // SQL hidden in model
        res.render('students', { students: rows });
    });
});
```

## Key OOP concepts
- `class` — defines a blueprint for objects
- `constructor()` — runs when you do `new StudentModel()`
- Methods — functions that belong to the class (`get`, `insert`, `remove`)
- `module.exports` — makes the class available to other files
- `require('./models/StudentModel')` — imports the class
