const express = require('express');
const router = new express.Router();
const sensors = require('../controllers/sensors.js');
const types = require('../controllers/types.js');
const parts = require('../controllers/parts.js');
const calibrations = require('../controllers/calibrations.js');
const types_sensors = require('../controllers/types_sensors.js');

router.route('/sensors/:id?')
  .get(sensors.get)
  .post(sensors.post)
  .put(sensors.put);

router.route('/types/:code?')
  .get(types.get);

router.route('/parts/:id?')
  .get(parts.get);

router.route('/calibrations/:id?')
  .get(calibrations.get);

router.route('/types/:code/sensors/:id?')
  .get(types_sensors.get);

module.exports = router;
