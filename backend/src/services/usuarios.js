const pool = require('../config/db');

async function buscarPorEmail(email) {
  const [filas] = await pool.query(
    'SELECT * FROM usuarios WHERE email = ?', [email]
  );
  return filas[0];   // undefined si no existe
}

async function crearUsuario(nombre, email, hash) {
  const [resultado] = await pool.query(
    'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)',
    [nombre, email, hash]
  );
  return resultado.insertId;   // id del usuario recién creado
}

async function buscarPorId(id) {
  const [filas] = await pool.query(
    'SELECT id, nombre, email, monedas FROM usuarios WHERE id = ?', [id]
  );
  return filas[0];
}

module.exports = { buscarPorEmail, crearUsuario, buscarPorId };