const sensors = require('../db_apis/sensors.js');

async function get(req, res, next) {
  try {
    const context = {};

    context.id = parseInt(req.params.id, 10);

    const rows = await sensors.find(context);

    if (req.params.id) {
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

function getSensorFromRec(req) {
  const sensor = {
    sensor_part_id: req.body.sensor_part_id,
    oem_serial_no: req.body.oem_serial_no,
    barcode: req.body.barcode,
    project_code: req.body.project_code,
    nh_sensor_id: req.body.nh_sensor_id,
    cal_due_date: req.body.cal_due_date,
  };

  return sensor;
}

async function post(req, res, next) {
  try {
    let sesnor = getSensorFromRec(req);

    sensor = await sensors.create(sensor);

    res.status(201).json(sensor);
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;

async function put(req, res, next) {
  try {
    let sensor = getSensorFromRec(req);

    sensor.sensor_id = parseInt(req.params.id, 10);

    sensor = await sensors.update(sensor);

    if (sensor !== null) {
      res.status(200).json(sensor);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.put = put;  


