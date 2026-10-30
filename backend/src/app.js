require('dotenv').config();

const express = require('express');
const pool = require('./config/db');
const app = express();

app.get('/', (req, res) => {
  res.json({ mensaje: 'El Quinielón funcionando' });
});

app.get('/test-db', async (req, res) => {
  const [filas] = await pool.query('SELECT COUNT(*) AS total FROM usuarios');
  res.json(filas[0]);
});

app.listen(process.env.PORT || 3000, () => console.log('Servidor en http://localhost:3000'));