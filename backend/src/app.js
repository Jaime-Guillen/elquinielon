require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rutasAuth = require('./routes/auth');
const rutasLigas = require('./routes/ligas');
const rutasJornadas = require('./routes/jornadas');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'El Quinielón funcionando' });
});

app.use('/api/auth', rutasAuth);
app.use('/api/ligas', rutasLigas);
app.use('/api/jornadas', rutasJornadas);  

app.listen(process.env.PORT || 3000, () => console.log('Servidor en http://localhost:3000'));