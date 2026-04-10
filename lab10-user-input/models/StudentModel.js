const db = require('../db');

class StudentModel {
    constructor() {}

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

    insert(student, callback) {
        // Insert into Students first, then Student_Programme
        const { id, name, programme } = student;
        db.query('INSERT INTO Students (id, name) VALUES (?, ?)', [id, name], (err) => {
            if (err) return callback(err);
            if (!programme) return callback(null);
            db.query('INSERT INTO Student_Programme (id, programme) VALUES (?, ?)',
                [id, programme], callback);
        });
    }

    // Update student's programme in Student_Programme
    updateById(studentId, programmeId, callback) {
        // Check if entry exists first
        db.query('SELECT * FROM Student_Programme WHERE id = ?', [studentId], (err, rows) => {
            if (err) return callback(err);
            if (rows.length > 0) {
                db.query('UPDATE Student_Programme SET programme = ? WHERE id = ?',
                    [programmeId, studentId], callback);
            } else {
                db.query('INSERT INTO Student_Programme (id, programme) VALUES (?, ?)',
                    [studentId, programmeId], callback);
            }
        });
    }

    remove(id, callback) {
        db.query('DELETE FROM Student_Programme WHERE id = ?', [id], (err) => {
            if (err) return callback(err);
            db.query('DELETE FROM Students WHERE id = ?', [id], callback);
        });
    }
}

module.exports = StudentModel;
