const pool = require('../config/db');

async function crearLiga(nombre, creadorId, maxJugadores, codigo) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [res] = await conn.query(
      'INSERT INTO ligas (nombre, codigo_invitacion, creador_id, max_jugadores) VALUES (?, ?, ?, ?)',
      [nombre, codigo, creadorId, maxJugadores]
    );
    await conn.query(
      'INSERT INTO liga_miembros (liga_id, usuario_id) VALUES (?, ?)',
      [res.insertId, creadorId]
    );
    await conn.commit();
    return res.insertId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

async function buscarPorCodigo(codigo) {
  const [filas] = await pool.query(
    'SELECT * FROM ligas WHERE codigo_invitacion = ?', [codigo]
  );
  return filas[0];
}

async function contarMiembros(ligaId) {
  const [filas] = await pool.query(
    'SELECT COUNT(*) AS total FROM liga_miembros WHERE liga_id = ?', [ligaId]
  );
  return filas[0].total;
}

async function esMiembro(ligaId, usuarioId) {
  const [filas] = await pool.query(
    'SELECT 1 FROM liga_miembros WHERE liga_id = ? AND usuario_id = ?',
    [ligaId, usuarioId]
  );
  return filas.length > 0;
}

async function anadirMiembro(ligaId, usuarioId) {
  await pool.query(
    'INSERT INTO liga_miembros (liga_id, usuario_id) VALUES (?, ?)',
    [ligaId, usuarioId]
  );
}

async function ligasDeUsuario(usuarioId) {
  const [filas] = await pool.query(
    `SELECT l.id, l.nombre, l.codigo_invitacion, l.max_jugadores, lm.puntos_totales
     FROM liga_miembros lm
     JOIN ligas l ON l.id = lm.liga_id
     WHERE lm.usuario_id = ?`,
    [usuarioId]
  );
  return filas;
}

module.exports = {
  crearLiga, buscarPorCodigo, contarMiembros,
  esMiembro, anadirMiembro, ligasDeUsuario
};