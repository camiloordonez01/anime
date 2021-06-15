const express = require('express');
const router = express.Router();

const {index, animeById, csvImport} = require('../controllers/animes.controller');

router.get('/', index);
router.get('/:id', animeById);
router.get('/import', csvImport);

module.exports = router;