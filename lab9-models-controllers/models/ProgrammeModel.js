const db = require('../db');

class ProgrammeModel {
    constructor() {}

    get(id, callback) {
        if (id === null) {
            return db.query('SELECT * FROM programmes', callback);
        }
        return db.query('SELECT * FROM programmes WHERE id = ?', [id], callback);
    }

    // Get all modules for a programme (many-to-many)
    getProgrammingLanguages(programmeId, callback) {
        const sql = `
            SELECT modules.*
            FROM modules
            JOIN programme_module ON modules.id = programme_module.module_id
            WHERE programme_module.programme_id = ?
        `;
        return db.query(sql, [programmeId], callback);
    }

    // Get all students on a programme
    getStudents(programmeId, callback) {
        return db.query('SELECT * FROM students WHERE programme_id = ?', [programmeId], callback);
    }

    insert(programme, callback) {
        return db.query('INSERT INTO programmes SET ?', programme, callback);
    }

    remove(id, callback) {
        return db.query('DELETE FROM programmes WHERE id = ?', [id], callback);
    }
}

module.exports = ProgrammeModel;
