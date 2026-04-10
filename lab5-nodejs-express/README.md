# Lab 5 - Backend programming with Node.js and Express.js

## What this lab covers
Server-side programming with Node.js, Express.js routes, serving static files, and RESTful API basics.

## Files

| File | Description |
|------|-------------|
| `index.js` | Basic HTTP server using Node's built-in `http` module |
| `server.js` | Express server with routes, static files, and REST API |
| `public/index.html` | Static HTML page served by Express |
| `package.json` | Project config and dependencies |

## Setup — run this ONCE

```bash
cd lab5-nodejs-express
npm install
```

## How to run

**Option A — Basic Node server (index.js):**
```bash
node index.js
```
Visit: http://127.0.0.1:3000

**Option B — Express server (server.js):**
```bash
node server.js
```
Visit: http://localhost:3000

Stop the server with `Ctrl + C`.

## Routes

| Method | URL | What it does |
|--------|-----|--------------|
| GET | `/` | Hello World |
| GET | `/goodbye` | Goodbye message |
| GET | `/user/:name` | Greet by name (dynamic route) |
| GET | `/api/students` | Return all students (JSON) |
| GET | `/api/students/:id` | Return one student by id |
| POST | `/api/students` | Add a new student |
| DELETE | `/api/students/:id` | Delete a student |

## Key concepts

- **Node.js** runs JavaScript on the server (not the browser)
- **Express** is a framework that makes building servers easier
- **Static files** — HTML/CSS/JS served directly from the `public/` folder
- **Routes** — the server listens for specific URL paths and responds
- **REST** — uses HTTP methods (GET, POST, PUT, DELETE) to perform actions
- **req.params** — access dynamic URL parts like `/user/:name`
- **res.json()** — send a JSON response
- **res.send()** — send a plain text response
