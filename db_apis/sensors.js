const database = require('../services/database.js');

const baseQuery =
 `SELECT s.bar_code as Barcode
       , s.oem_serial_no
       , s.project_cd as Project
       , s.cal_due_date
       , s.revision_dt
       , s.nh_sensor_id
       , spd.sensor_part_name
       , spd.sensor_type_cd
       , s.obsolete_flag as In_use
       , spd.equip_desc
    FROM sensor s
    JOIN sensor_part_definition spd
       ON(s.sensor_part_id = spd.sensor_part_id)`	

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id) {
    binds.sensor_id = context.id;

    query += `\nWHERE sensor_id = :sensor_id`;
  } else if (context.barcode) {
    bind.sensor_barcode = context.barcode;

    query += `\nWHERE sensor_barcode = :sensor_barcode`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
