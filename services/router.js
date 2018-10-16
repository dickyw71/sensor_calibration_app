const express = require('express');
const router = new express.Router();
const sensors = require('../controllers/sensors.js');
const types = require('../controllers/types.js');
const parts = require('../controllers/parts.js');

router.route('/sensors/:id?')
  .get(sensors.get)
  .post(sensors.post)
  .put(sensors.put);

router.route('/types/:code?')
  .get(types.get);

router.route('/parts/:id?')
  .get(parts.get);

module.exports = router;
