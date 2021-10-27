const mysql = require('mysql');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'company_db'
    },
);

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log(`Connected to the company_db database.`)
    }
});

module.exports = db;