// Dependencies
const express = require('express');
const mysql = require('mysql2');

// PORT
const PORT = process.env.PORT || 3001;
const app = express();

// Importing Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Creating database connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

// Default response for any other request
app.use((req, res) => {
    res.status(404).end();
});

// App listening on port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

module.exports = db;