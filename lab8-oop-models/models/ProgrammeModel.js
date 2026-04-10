// Programme Model — handles all database operations for programmes
// This is the MODEL in the MVC pattern

const db = require('../db');

class ProgrammeModel {

    constructor() {}

    // Get all programmes, or one by id
    get(id, callback) {
        if (id === null) {
            return db.query('SELECT * FROM programmes', callback);
        }
        return db.query('SELECT * FROM programmes WHERE id = ?', [id], callback);
    }

    // Get all students enrolled in a programme
    getStudents(programmeId, callback) {
        const sql = `
            SELECT students.*
            FROM students
            JOIN student_programme ON students.id = student_programme.student_id
            WHERE student_programme.programme_id = ?
        `;
        return db.query(sql, [programmeId], callback);
    }

    // Insert a new programme
    insert(programme, callback) {
        return db.query('INSERT INTO programmes SET ?', programme, callback);
    }

    // Remove a programme by id
    remove(id, callback) {
        return db.query('DELETE FROM programmes WHERE id = ?', [id], callback);
    }
}

module.exports = ProgrammeModel;
