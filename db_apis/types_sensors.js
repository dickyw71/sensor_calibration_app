const oracledb = require('oracledb');
const database = require('../services/database.js');

const countQuery =
 `select count(*) as "total"
    from sensor s 
    join sensor_part_definition spd
      on (s.sensor_part_id = spd.sensor_part_id)
    where 1 = 1`;

const basicQuery =
 `select s.bar_code as Barcode
       , s.sensor_id
       , spd.sensor_part_name
    from sensor s 
    join sensor_part_definition spd
      on (s.sensor_part_id = spd.sensor_part_id)
    where 1 = 1`;

const fullQuery =
 `select s.bar_code as Barcode
       , s.sensor_id
       , s.oem_serial_no
       , s.project_cd as Project
       , s.cal_due_date
       , s.revision_dt
       , s.nh_sensor_id
       , spd.sensor_part_name
       , spd.sensor_type_cd
       , s.obsolete_flag as In_use
       , spd.equip_desc
    from sensor s
    join sensor_part_definition spd
      on (s.sensor_part_id = spd.sensor_part_id)	
    where 1 = 1`;

async function find(context) {
  let query = basicQuery;

  if (context.view === 'count') {
    query = countQuery;
  } else if (context.view === 'basic') {
    query = basicQuery;
  } else if (context.view === 'full') {
    query = fullQuery;
  }

  const binds = {};

  if (context.code) {
    binds.code = context.code;

    query += `\nand spd.sensor_type_cd = :code`;
  }

  if (context.id) {
    binds.sensor_id = context.id;

    query += `\nand s.sensor_id = :sensor_id`;

  } 
 
  if (context.nh_sens_id || context.nh_sens_id === null) {
    binds.nh_sens_id = context.nh_sens_id;
    
    query += '\nand ((s.nh_sensor_id is null and :nh_sens_id is null) or s.nh_sensor_id = :nh_sens_id)';
  }

  query += '\norder by bar_code asc';

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;

const createSql = 
 `insert into sensor (
    sensor_part_id,
    oem_serial_no,
    bar_code,
    project_cd,
    nh_sensor_id,
    cal_due_date
  ) values (
    :sensor_part_id,
    :oem_serial_no,
    :barcode,
    :project_code,
    :nh_sensor_id,
    :cal_due_date
  ) returning sensor_id
  into :sensor_id`;

async function create(_sensor) {
  const sensor = Object.assign({}, _sensor);

  sensor.sensor_id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }

  const result = await database.simpleExecute(createSql, sensor);

  sensor.sensor_id = result.outBinds.sensor_id[0];

  return sensor;
}

module.exports.create = create;

const updateSql =
 `update sensor
  set sensor_part_id = :sensor_part_id,
    oem_serial_no = :oem_serial_no,
    bar_code = :barcode,
    project_cd = :project_code,
    nh_sensor_id = :nh_sensor_id,
    cal_due_date = :cal_due_date
  where sensor_id = :sensor_id`;

async function update(_sensor) {
  const sensor = Object.assign({}, _sensor);
  const result = await database.simpleExecute(updateSql, sensor);

  if (result.rowsAffected && result.rowsAffected === 1) {
    return sensor;
  } else {
    return null;
  }
}

module.exports.update = update;
