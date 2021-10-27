// Dependencies
const express = require('express');

// Establishing port + setting app to express.js functionality
const PORT = process.env.PORT || 3001;
const app = express();

// Extend express.js with urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request
app.use((req, res) => {
    res.status(404).end();
});

// App listening on port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})