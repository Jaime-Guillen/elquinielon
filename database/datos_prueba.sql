USE elquinielon;

INSERT INTO jornadas (numero, competicion, fecha_cierre, estado)
VALUES (1, 'LaLiga', DATE_ADD(NOW(), INTERVAL 7 DAY), 'abierta');

SET @jornada = LAST_INSERT_ID();

INSERT INTO partidos (jornada_id, equipo_local, equipo_visitante, fecha_hora) VALUES
(@jornada, 'Real Madrid', 'Sevilla', DATE_ADD(NOW(), INTERVAL 8 DAY)),
(@jornada, 'FC Barcelona', 'Valencia', DATE_ADD(NOW(), INTERVAL 8 DAY)),
(@jornada, 'Atlético de Madrid', 'Villarreal', DATE_ADD(NOW(), INTERVAL 8 DAY)),
(@jornada, 'Athletic Club', 'Real Sociedad', DATE_ADD(NOW(), INTERVAL 8 DAY)),
(@jornada, 'Real Betis', 'Osasuna', DATE_ADD(NOW(), INTERVAL 8 DAY)),
(@jornada, 'Celta de Vigo', 'Getafe', DATE_ADD(NOW(), INTERVAL 9 DAY)),
(@jornada, 'Girona', 'Mallorca', DATE_ADD(NOW(), INTERVAL 9 DAY)),
(@jornada, 'Rayo Vallecano', 'Alavés', DATE_ADD(NOW(), INTERVAL 9 DAY)),
(@jornada, 'Espanyol', 'Las Palmas', DATE_ADD(NOW(), INTERVAL 9 DAY)),
(@jornada, 'Levante', 'Elche', DATE_ADD(NOW(), INTERVAL 9 DAY));