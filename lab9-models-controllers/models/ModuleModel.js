const db = require('../db');

class ModuleModel {
    constructor() {}

    get(code, callback) {
        if (code === null) return db.query('SELECT * FROM Modules', callback);
        return db.query('SELECT * FROM Modules WHERE code = ?', [code], callback);
    }
}

module.exports = ModuleModel;
