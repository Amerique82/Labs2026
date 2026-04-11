# Labs2026 — Software Development 2

https://amerique82.github.io/Labs2026/

A compendium of weekly lab exercises from the **Software Development 2** module at the University of Roehampton. Each folder corresponds to a lab completed week by week throughout the course, covering the full stack of modern web development.

---

## Labs

| Lab | Folder | Topics |
|-----|--------|--------|
| Lab 1 | `lab1-html` | HTML fundamentals — page structure, headings, links, tables, images, forms, CSS, semantic HTML5 |
| Lab 2 | `lab2-forms-css-git` | HTML forms (GET vs POST), external CSS, Git workflow (add, commit, push, pull) |
| Lab 3 | `lab3-bootstrap-git-branching` | Bootstrap CSS framework, styled forms, Git branching and merging |
| Lab 4 | `lab4-javascript` | JavaScript fundamentals — DOM manipulation, variables, conditionals, loops, functions, arrays, objects |
| Lab 5 | `lab5-nodejs-express` | Backend with Node.js and Express.js — HTTP server, routes, REST API, static files |
| Lab 6 | `lab6-express-mysql` | Express + MySQL via Docker — database-driven app, Docker Compose, CRUD API |
| Lab 7 | `lab7-pug-templates` | Pug template engine — server-side rendering, layouts, loops and conditionals in templates |
| Lab 8 | `lab8-oop-models` | MVC pattern with OOP — separating models, views and controllers |
| Lab 9 | `lab9-models-controllers` | Advanced models — many-to-many relationships, JOIN queries, Programme and Module models |
| Lab 10 | `lab10-user-input` | Full CRUD via web forms — add students, change programme, delete, `updateById` |
| Lab 11 | `lab11-auth` | Authentication — bcrypt password hashing, express-session, login/register, protected routes |

---

## Tech stack

- **Frontend:** HTML5, CSS3, Bootstrap, JavaScript
- **Backend:** Node.js, Express.js
- **Templates:** Pug
- **Database:** MySQL (via Docker)
- **Auth:** bcrypt, express-session
- **Tools:** Git, GitHub, Docker, VS Code

---

## How to run the backend labs (6–11)

1. Make sure Docker Desktop is open
2. Start MySQL:
```bash
cd lab6-express-mysql
docker-compose up -d db
```
3. Go into any lab folder, install dependencies and run:
```bash
cd lab<n>-<name>
npm install
node addtable.js   # first time only
node server.js
```
4. Open `http://localhost:4000` in your browser

---

*University of Roehampton — BSc Software Development 2 — 2025/2026*
