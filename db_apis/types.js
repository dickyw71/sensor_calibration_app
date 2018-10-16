const database = require('../services/database.js');

const baseQuery =
 `select sensor_type_cd "sensor_type_cd",
    tech_type_cd "tech_type_cd",
    sensor_type_sdesc "sensor_type_sdesc",
    sensor_type_mdesc "sensor_type_mdesc",
    sub_sensor_flag "sub_sensor_flag", 
    identifier_code "identifier_code",
    obsolete_flag "obsolete_flag",
    category_code "category_code",
    creation_dt "creation_dt",
    revision_dt "revision_dt",
    revision_user "revision_user"
  from ref_sensor_type`;

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.code) {
    binds.sensor_type_cd = context.code;
 
    query += `\nwhere sensor_type_cd = :sensor_type_cd`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
