const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { registro, login, yo } = require('../controllers/authController');

router.post('/registro', registro);
router.post('/login', login);
router.get('/yo', auth, yo);

module.exports = router;