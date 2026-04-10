# Lab 10 - Adding and Changing Data via Web Front End

## What this lab covers
Full CRUD operations through web forms: add a student, change their programme, delete them.

## New routes vs Lab 9
| Route | Method | What it does |
|-------|--------|-------------|
| `/students/add` | GET | Show add student form |
| `/students/add` | POST | Save new student to DB |
| `/student/:id/edit` | GET | Show edit form with programme dropdown |
| `/student/:id/edit` | POST | Update student's programme in DB |
| `/student/:id/delete` | POST | Delete student from DB |

## Key new model method
```javascript
// StudentModel.updateById — updates specific fields by id
model.updateById(id, { programme_id: 2 }, callback);
```

## How to run
```bash
cd ../lab6-express-mysql && docker-compose up -d db
cd ../lab10-user-input
npm install
node server.js
```
Visit: http://localhost:4000 (uses same DB as lab 9)
