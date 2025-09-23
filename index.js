const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test'
});

// Create a new Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default route
app.get('/', (req, res) => {
  res.send('API is running! Try /attractions to see data.');
});

// Attractions route
app.get('/attractions', (req, res) => {
  pool.query('SELECT * FROM attraction', (error, results) => {
    if (error) {
      console.error("DB Error:", error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
