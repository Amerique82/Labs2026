const db = require('../db');

class ProgrammeModel {
    constructor() {}

    get(id, callback) {
        if (id === null) return db.query('SELECT * FROM Programmes ORDER BY name', callback);
        return db.query('SELECT * FROM Programmes WHERE id = ?', [id], callback);
    }
}

module.exports = ProgrammeModel;
