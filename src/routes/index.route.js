const express = require('express');
const animes = require('./animes.router');

const router = express.Router();

router.use('/animes', animes);
router.get('/', (req, res) => res.send('Sample Node API Version1'));

module.exports = router;