# Lab 6 - Express.js and MySQL with Docker

## What this lab covers
Connecting an Express.js server to a MySQL database running in a Docker container.

## Files

| File | Description |
|------|-------------|
| `docker-compose.yml` | Defines the MySQL + Node.js containers |
| `Dockerfile` | Instructions to build the Node.js app container |
| `server.js` | Express server with REST API routes |
| `db.js` | MySQL database connection |
| `addtable.js` | Script to create the students table and insert test data |
| `package.json` | Project dependencies (express, mysql2) |

## How to run

### Step 1 — Make sure Docker is running
Open Docker Desktop first.

### Step 2 — Start the MySQL container
```bash
cd lab6-express-mysql
docker-compose up -d db
```

### Step 3 — Install dependencies and create the table
```bash
npm install
node addtable.js
```

### Step 4 — Start the Express server
```bash
node server.js
```
Visit: http://localhost:4000

### Step 5 — Test the API
```bash
# Get all students
curl http://localhost:4000/api/students

# Get one student
curl http://localhost:4000/api/students/1

# Add a student
curl -X POST http://localhost:4000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"New Student","course":"Software Development","email":"new@test.com"}'

# Delete a student
curl -X DELETE http://localhost:4000/api/students/1
```

## Key concepts

| Concept | What it means |
|---------|---------------|
| Docker | Runs software in isolated containers — same on every machine |
| MySQL | Relational database (tables, rows, columns) |
| mysql2 | Node.js package to communicate with MySQL |
| `?` placeholders | Prevent SQL injection in queries |
| `docker-compose up` | Start all containers defined in docker-compose.yml |
| `docker-compose down` | Stop all containers |
