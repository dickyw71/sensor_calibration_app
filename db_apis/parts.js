const database = require('../services/database.js');

const countQuery =
 `select count(*) as "total"
   from sensor_part_definition
   where 1 = 1`;

const basicQuery =
 `select sensor_part_id "sensor_part_id",
    sensor_part_name "sensor_part_name",
    equip_desc "equip_desc"
  from sensor_part_definition
  where 1 = 1`;
   
const fullQuery =
 `select sensor_part_id "sensor_part_id",
    sensor_type_cd "sensor_type_cd",
    sensor_part_name "sensor_part_name",
    equip_desc "equip_desc",
    oem_part_no "oem_part_no",
    obsolete_flag "obsolete_flag",
    creation_dt "creation_dt",
    revision_dt "revision_dt",
    revision_user "revision_user",
    unit_cd_in "unit_cd_in",
    unit_cd_out "unit_cd_out",
    xy_raw_data_flag "xy_raw_data_flag",
    type_to_use "type_to_use",
    default_table_id "default_table_id",
    cal_period "cal_period",
    shelf_life "shelf_life",
    equip_range "equip_range",
    equip_accuracy "equip_accuracy",
    cal_uncert "cal_uncert",
    cal_type "cal_type",
    ccp_ref "ccp_ref",
    lcp_ref "lcp_ref",
    cal_category_cd "cal_category_cd"
  from sensor_part_definition
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

  if (context.id) {
    binds.sensor_part_id = context.id;
 
    query += `\nand sensor_part_id = :sensor_part_id`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
