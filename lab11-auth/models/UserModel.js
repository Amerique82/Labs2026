const db = require('../db');
const bcrypt = require('bcrypt');

class UserModel {

    // Find a user by email address
    static getByEmail(email, callback) {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    }

    // Hash a plain-text password using bcrypt (salt rounds = 10)
    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    // Compare a plain-text password against a stored hash
    static checkPassword(password, hash) {
        return bcrypt.compareSync(password, hash);
    }

    // Create a new user — hashes password before storing
    static create(email, password, callback) {
        const hashed = UserModel.hashPassword(password);
        db.query(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashed],
            callback
        );
    }

    // Authenticate: find user by email and verify password
    static authenticate(email, password, callback) {
        UserModel.getByEmail(email, (err, rows) => {
            if (err) return callback(err, null);
            if (rows.length === 0) return callback(null, null); // user not found
            const user = rows[0];
            if (UserModel.checkPassword(password, user.password)) {
                callback(null, user); // success
            } else {
                callback(null, null); // wrong password
            }
        });
    }
}

module.exports = UserModel;
