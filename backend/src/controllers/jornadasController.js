const jornadas = require('../services/jornadas');

async function actual(req, res) {
  const jornada = await jornadas.jornadaAbierta();
  if (!jornada) {
    return res.status(404).json({ error: 'No hay ninguna jornada abierta' });
  }
  const partidos = await jornadas.partidosDeJornada(jornada.id);
  res.json({ jornada, partidos });
}

module.exports = { actual };