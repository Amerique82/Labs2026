const mysql = require('mysql2');
const db = mysql.createConnection({
    host:     process.env.DB_HOST     || '127.0.0.1',
    user:     process.env.DB_USER     || 'lab6user',
    password: process.env.DB_PASSWORD || 'lab6password',
    database: process.env.DB_NAME     || 'lab6db'
});
db.connect(err => {
    if (err) { console.error('MySQL error:', err.message); return; }
    console.log('Connected to MySQL.');
});
module.exports = db;
