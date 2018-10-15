const express = require('express');
const router = new express.Router();
const sensors = require('../controllers/sensors.js');

router.route('/sensors/:id?')
  .get(sensors.get)
  .post(sensors.post)
  .put(sensors.put)
  .delete(sensors.delete);

module.exports = router;
