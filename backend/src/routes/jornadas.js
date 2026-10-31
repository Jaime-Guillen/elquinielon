const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { actual } = require('../controllers/jornadasController');

router.use(auth);

router.get('/actual', actual);

module.exports = router;