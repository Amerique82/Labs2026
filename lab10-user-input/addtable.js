// Run once: node addtable.js  (same schema as lab 9)
const db = require('./db');

const queries = [
    `CREATE TABLE IF NOT EXISTS Modules (
        code VARCHAR(10) PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS Programmes (
        id VARCHAR(8) PRIMARY KEY,
        name VARCHAR(50)
    )`,
    `CREATE TABLE IF NOT EXISTS Programme_Modules (
        programme VARCHAR(8) NOT NULL,
        module VARCHAR(10) NOT NULL,
        FOREIGN KEY (programme) REFERENCES Programmes(id),
        FOREIGN KEY (module) REFERENCES Modules(code)
    )`,
    `CREATE TABLE IF NOT EXISTS Students (
        id INT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS Student_Programme (
        id INT,
        programme VARCHAR(8),
        FOREIGN KEY (id) REFERENCES Students(id),
        FOREIGN KEY (programme) REFERENCES Programmes(id)
    )`,
    `INSERT IGNORE INTO Modules VALUES
        ('CMP020C101','Software Development 1'),
        ('CMP020C102','Computer Systems'),
        ('CMP020C103','Mathematics for Computer Science'),
        ('CMP020C104','Software Development 2'),
        ('CMP020C105','Computing and Society'),
        ('CMP020C106','Databases'),
        ('PHY020C101','Physics Skills and Techniques'),
        ('PHY020C102','Mathematics for Physics'),
        ('PHY020C103','Computation for Physics'),
        ('PHY020C106','Introduction to Astrophysics')`,
    `INSERT IGNORE INTO Programmes VALUES
        ('09UU0001','BSc Computer Science'),
        ('09UU0002','BEng Software Engineering'),
        ('09UU0003','BSc Physics')`,
    `INSERT IGNORE INTO Programme_Modules VALUES
        ('09UU0001','CMP020C101'),('09UU0001','CMP020C102'),('09UU0001','CMP020C103'),
        ('09UU0001','CMP020C104'),('09UU0001','CMP020C105'),('09UU0001','CMP020C106'),
        ('09UU0002','CMP020C101'),('09UU0002','CMP020C102'),('09UU0002','CMP020C103'),
        ('09UU0002','CMP020C104'),('09UU0002','CMP020C105'),('09UU0002','CMP020C106'),
        ('09UU0003','PHY020C101'),('09UU0003','PHY020C102'),
        ('09UU0003','PHY020C103'),('09UU0003','PHY020C106')`,
    `INSERT IGNORE INTO Students VALUES
        (1,'Kevin Chalmers'),(2,'Lisa Haskel'),(3,'Arturo Araujo'),
        (4,'Sobhan Tehrani'),(100,'Oge Okonor'),(200,'Kimia Aksir')`,
    `INSERT IGNORE INTO Student_Programme VALUES
        (1,'09UU0002'),(2,'09UU0001'),(3,'09UU0003'),(4,'09UU0001')`
];

let done = 0;
queries.forEach((sql, i) => {
    db.query(sql, err => {
        if (err) console.error(`Query ${i+1} error:`, err.message);
        else console.log(`Query ${i+1} done.`);
        if (++done === queries.length) { db.end(); console.log('Done! Run: node server.js'); }
    });
});
