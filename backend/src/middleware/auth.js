const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const cabecera = req.headers.authorization || '';
  const token = cabecera.replace('Bearer ', '');

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'No autorizado' });
  }
}

module.exports = auth;