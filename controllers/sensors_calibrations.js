const sensors_calibrations = require('../db_apis/sensors_calibrations.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.sensor_id = parseInt(req.params.sensor_id, 10);
    context.cal_id = parseInt(req.params.cal_id, 10);
    context.sort = req.query.sort;
    context.view = req.query.view;   

    const rows = await sensors_calibrations.find(context);

    if (req.params.cal_id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get;


