const express = require('express');
const distanceController = require('../controllers/distance-controller');
const bierenController = require('../controllers/bieren-controller');
const addbreweryController = require('../controllers/addbrewery-controller');
const router = express.Router();

router.post('/api/distance', distanceController.postDistance);

router.post('/api/bieren', bierenController.postbiren);

router.post('/api/addbrewery', addbreweryController.postaddbrewery);

module.exports = router;
