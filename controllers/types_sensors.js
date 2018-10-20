const types_sensors = require('../db_apis/types_sensors.js')

async function get(req, res, next) {
  try {
    const context = {};

    context.code = req.params.code;
    if(req.query.nh_sens_id === 'null') {
      context.nh_sens_id = null;
    } 

    const rows = await types_sensors.find(context);

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
