// Student Model — handles all database operations for students
// This is the MODEL in the MVC pattern

const db = require('../db');

class StudentModel {

    constructor() {}

    // Get all students, or one student by id
    // If id is null, returns all students
    get(id, callback) {
        if (id === null) {
            return db.query('SELECT * FROM students', callback);
        }
        return db.query('SELECT * FROM students WHERE id = ?', [id], callback);
    }

    // Insert a new student into the database
    insert(student, callback) {
        return db.query('INSERT INTO students SET ?', student, callback);
    }

    // Remove a student by id
    remove(id, callback) {
        return db.query('DELETE FROM students WHERE id = ?', [id], callback);
    }

    // Update a student's details
    update(id, student, callback) {
        return db.query('UPDATE students SET ? WHERE id = ?', [student, id], callback);
    }
}

module.exports = StudentModel;
