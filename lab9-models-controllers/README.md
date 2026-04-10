# Lab 9 - Models and Controllers with OOP

## What this lab covers
Extending the MVC pattern with many-to-many relationships: Student → Programme → Modules.

## Database schema
```
students (id, name, email, programme_id)
    └── programmes (id, name, code)
            └── programme_module (programme_id, module_id)
                    └── modules (id, name, code)
```

## Models
| Model | Key methods |
|-------|-------------|
| `StudentModel` | `get(id)`, `getProgrammeName(studentId)`, `insert`, `remove`, `update` |
| `ProgrammeModel` | `get(id)`, `getProgrammingLanguages(programmeId)`, `getStudents(programmeId)` |
| `ModuleModel` | `get(id)`, `insert`, `remove` |

## How to run
```bash
cd ../lab6-express-mysql && docker-compose up -d db
cd ../lab9-models-controllers
npm install
node addtable.js
node server.js
```
Visit: http://localhost:4000
