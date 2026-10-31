const pool = require('../config/db');

async function jornadaAbierta() {
  const [filas] = await pool.query(
    "SELECT * FROM jornadas WHERE estado = 'abierta' ORDER BY numero LIMIT 1"
  );
  return filas[0];
}

async function partidosDeJornada(jornadaId) {
  const [filas] = await pool.query(
    'SELECT id, equipo_local, equipo_visitante, fecha_hora FROM partidos WHERE jornada_id = ? ORDER BY fecha_hora, id',
    [jornadaId]
  );
  return filas;
}

module.exports = { jornadaAbierta, partidosDeJornada };