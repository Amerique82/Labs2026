const db = require('../db');

class ProgrammeModel {
    constructor() {}

    get(id, callback) {
        if (id === null) return db.query('SELECT * FROM Programmes', callback);
        return db.query('SELECT * FROM Programmes WHERE id = ?', [id], callback);
    }

    // Get all modules for a programme (many-to-many via Programme_Modules)
    getProgrammingLanguages(programmeId, callback) {
        const sql = `
            SELECT Modules.*
            FROM Modules
            JOIN Programme_Modules ON Modules.code = Programme_Modules.module
            WHERE Programme_Modules.programme = ?
        `;
        return db.query(sql, [programmeId], callback);
    }

    // Get all students on a programme
    getStudents(programmeId, callback) {
        const sql = `
            SELECT Students.*
            FROM Students
            JOIN Student_Programme ON Students.id = Student_Programme.id
            WHERE Student_Programme.programme = ?
        `;
        return db.query(sql, [programmeId], callback);
    }
}

module.exports = ProgrammeModel;
