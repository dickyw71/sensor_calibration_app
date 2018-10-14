const express = require('express');
const router = new express.Router();
const sensors = require('../controllers/sensos.js');

router.route('/sensors/:id?')
  .get(sensors.get);

module.exports = router;
