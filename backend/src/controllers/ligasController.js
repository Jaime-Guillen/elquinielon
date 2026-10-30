const crypto = require('crypto');
const ligas = require('../services/ligas');

async function crear(req, res) {
  const { nombre, maxJugadores = 10 } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'Falta el nombre de la liga' });
  }
  if (!Number.isInteger(maxJugadores) || maxJugadores < 2 || maxJugadores > 50) {
    return res.status(400).json({ error: 'maxJugadores debe estar entre 2 y 50' });
  }

  const codigo = crypto.randomBytes(4).toString('hex').toUpperCase();
  const id = await ligas.crearLiga(nombre, req.usuario.id, maxJugadores, codigo);

  res.status(201).json({ id, nombre, codigo_invitacion: codigo, maxJugadores });
}

async function unirse(req, res) {
  const { codigo } = req.body;

  if (!codigo) {
    return res.status(400).json({ error: 'Falta el código' });
  }

  const liga = await ligas.buscarPorCodigo(codigo);
  if (!liga) {
    return res.status(404).json({ error: 'No existe ninguna liga con ese código' });
  }
  if (await ligas.esMiembro(liga.id, req.usuario.id)) {
    return res.status(409).json({ error: 'Ya estás en esta liga' });
  }
  if ((await ligas.contarMiembros(liga.id)) >= liga.max_jugadores) {
    return res.status(409).json({ error: 'La liga está completa' });
  }

  await ligas.anadirMiembro(liga.id, req.usuario.id);
  res.json({ mensaje: 'Te has unido a la liga', liga: liga.nombre });
}

async function misLigas(req, res) {
  const lista = await ligas.ligasDeUsuario(req.usuario.id);
  res.json(lista);
}

module.exports = { crear, unirse, misLigas };