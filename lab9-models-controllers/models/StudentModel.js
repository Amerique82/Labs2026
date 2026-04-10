const db = require('../db');

class StudentModel {
    constructor() {}

    // Get all students, or one by id — includes programme name via JOIN
    get(id, callback) {
        const sql = `
            SELECT Students.id, Students.name,
                   Programmes.id AS programme_id,
                   Programmes.name AS programme_name
            FROM Students
            LEFT JOIN Student_Programme ON Students.id = Student_Programme.id
            LEFT JOIN Programmes ON Student_Programme.programme = Programmes.id
        `;
        if (id === null) return db.query(sql, callback);
        return db.query(sql + ' WHERE Students.id = ?', [id], callback);
    }

    // Get the programme name for a specific student
    getProgrammeName(studentId, callback) {
        const sql = `
            SELECT Programmes.name
            FROM Students
            JOIN Student_Programme ON Students.id = Student_Programme.id
            JOIN Programmes ON Student_Programme.programme = Programmes.id
            WHERE Students.id = ?
        `;
        return db.query(sql, [studentId], callback);
    }

    insert(student, callback) {
        return db.query('INSERT INTO Students SET ?', student, callback);
    }

    remove(id, callback) {
        return db.query('DELETE FROM Students WHERE id = ?', [id], callback);
    }
}

module.exports = StudentModel;
