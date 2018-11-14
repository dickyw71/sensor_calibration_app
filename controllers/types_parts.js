const types_parts = require('../db_apis/types_parts.js')

async function get(req, res, next) {
  try {
    const context = {};

    context.code = req.params.code;
    context.id = parseInt(req.params.id, 10);

    context.view = req.query.view;
    context.sort = req.query.sort;

    const rows = await types_parts.find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } 
    }
    else if (rows.length > 0) {
        res.status(200).json(rows);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}

module.exports.get = get; 
