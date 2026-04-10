const db = require('../db');

class StudentModel {
    constructor() {}

    get(id, callback) {
        const sql = `
            SELECT students.*, programmes.name AS programme_name
            FROM students
            LEFT JOIN programmes ON students.programme_id = programmes.id
        `;
        if (id === null) return db.query(sql, callback);
        return db.query(sql + ' WHERE students.id = ?', [id], callback);
    }

    insert(student, callback) {
        return db.query('INSERT INTO students SET ?', student, callback);
    }

    // Update a student by id — used for changing programme
    updateById(id, data, callback) {
        return db.query('UPDATE students SET ? WHERE id = ?', [data, id], callback);
    }

    remove(id, callback) {
        return db.query('DELETE FROM students WHERE id = ?', [id], callback);
    }
}

module.exports = StudentModel;
