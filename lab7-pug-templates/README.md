# Lab 7 - Building the Frontend with Pug Templates

## What this lab covers
Using the Pug template engine with Express to render HTML pages with dynamic data from a MySQL database.

## Files

| File | Description |
|------|-------------|
| `server.js` | Express server using `res.render()` instead of `res.json()` |
| `db.js` | MySQL connection (reused from Lab 6) |
| `views/layout.pug` | Base layout with navbar — all pages extend this |
| `views/index.pug` | Home page |
| `views/students.pug` | Table of all students from DB |
| `views/student.pug` | Single student detail page |
| `views/add-student.pug` | Form to add a new student |
| `views/404.pug` | Not found page |

## How to run

Requires MySQL running from Lab 6:
```bash
cd ../lab6-express-mysql
docker-compose up -d db
cd ../lab7-pug-templates
npm install
node server.js
```
Visit: http://localhost:4000

## Pug syntax quick reference

```pug
doctype html          → <!DOCTYPE html>
h1 Hello              → <h1>Hello</h1>
p= variable           → <p>value of variable</p>
p #{variable} text    → <p>value text</p>
a(href='/page') Link  → <a href="/page">Link</a>

each item in list     → for loop
  p= item

if condition          → if statement
  p Yes
else
  p No

extends layout        → inherit from layout.pug
block content         → define a replaceable block
```

## Key difference from Lab 6
| Lab 6 | Lab 7 |
|-------|-------|
| `res.json(data)` | `res.render('template', { data })` |
| Returns raw JSON | Returns rendered HTML page |
| For APIs | For web pages |
