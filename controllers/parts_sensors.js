const parts_sensors = require('../db_apis/parts_sensors.js')

async function get(req, res, next) {
  try {
    const context = {};

    context.part_id = parseInt(req.params.part_id, 10);
    context.sensor_id = parseInt(req.params.sensor_id, 10);

    if(req.query.nh_sens_id === 'null') {
      context.nh_sens_id = null;
    } 

    context.sort = req.query.sort;
    context.view = req.query.view;

    const rows = await parts_sensors.find(context);

    if (rows.length > 0) {
        res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get; 
