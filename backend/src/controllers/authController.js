const bcrypt = require('bcrypt');
const usuarios = require('../services/usuarios');

async function registro(req, res) {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const existente = await usuarios.buscarPorEmail(email);
  if (existente) {
    return res.status(409).json({ error: 'Ese email ya está registrado' });
  }

  const hash = await bcrypt.hash(password, 10);
  const id = await usuarios.crearUsuario(nombre, email, hash);

  res.status(201).json({ id, nombre, email });
}

module.exports = { registro };