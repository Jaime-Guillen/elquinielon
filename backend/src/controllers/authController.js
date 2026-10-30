const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const usuario = await usuarios.buscarPorEmail(email);
  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const correcta = await bcrypt.compare(password, usuario.password_hash);
  if (!correcta) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: usuario.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.json({
    token,
    usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
  });
}

async function yo(req, res) {
  const usuario = await usuarios.buscarPorId(req.usuario.id);
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json(usuario);
}

module.exports = { registro, login, yo };