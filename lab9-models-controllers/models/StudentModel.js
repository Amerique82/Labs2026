const db = require('../db');

class StudentModel {
    constructor() {}

    // Get all students (with programme name via JOIN)
    get(id, callback) {
        const sql = `
            SELECT students.*, programmes.name AS programme_name, programmes.code AS programme_code
            FROM students
            LEFT JOIN programmes ON students.programme_id = programmes.id
        `;
        if (id === null) {
            return db.query(sql, callback);
        }
        return db.query(sql + ' WHERE students.id = ?', [id], callback);
    }

    // Get the programme name for a specific student
    getProgrammeName(studentId, callback) {
        const sql = `
            SELECT programmes.name
            FROM students
            JOIN programmes ON students.programme_id = programmes.id
            WHERE students.id = ?
        `;
        return db.query(sql, [studentId], callback);
    }

    insert(student, callback) {
        return db.query('INSERT INTO students SET ?', student, callback);
    }

    remove(id, callback) {
        return db.query('DELETE FROM students WHERE id = ?', [id], callback);
    }

    update(id, data, callback) {
        return db.query('UPDATE students SET ? WHERE id = ?', [data, id], callback);
    }
}

module.exports = StudentModel;
