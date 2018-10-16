const types = require('../db_apis/types.js')

async function get(req, res, next) {
  try {
    const context = {};

    context.code = req.params.code;

    const rows = await types.find(context);

    if (req.params.code) {
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
