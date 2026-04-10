const db = require('../db');

class ProgrammeModel {
    constructor() {}

    get(id, callback) {
        if (id === null) return db.query('SELECT * FROM programmes ORDER BY name', callback);
        return db.query('SELECT * FROM programmes WHERE id = ?', [id], callback);
    }
}

module.exports = ProgrammeModel;
