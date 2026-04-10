const db = require('../db');

class ModuleModel {
    constructor() {}

    get(id, callback) {
        if (id === null) {
            return db.query('SELECT * FROM modules', callback);
        }
        return db.query('SELECT * FROM modules WHERE id = ?', [id], callback);
    }

    insert(module, callback) {
        return db.query('INSERT INTO modules SET ?', module, callback);
    }

    remove(id, callback) {
        return db.query('DELETE FROM modules WHERE id = ?', [id], callback);
    }
}

module.exports = ModuleModel;
