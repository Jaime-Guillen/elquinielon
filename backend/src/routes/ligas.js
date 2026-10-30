const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { crear, unirse, misLigas } = require('../controllers/ligasController');

router.use(auth);               // todas las rutas de este archivo exigen token

router.post('/', crear);
router.post('/unirse', unirse);
router.get('/', misLigas);

module.exports = router;