const database = require('../services/database.js');

const countQuery =
 `select count(*) as "total"
    from ref_sensor_type
    where 1 = 1`;

const basicQuery =
 `select sensor_type_cd "sensor_type_cd",
    sensor_type_sdesc "sensor_type_sdesc"
  from ref_sensor_type
  where 1 = 1`;

const fullQuery =
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
  from ref_sensor_type
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
    binds.sensor_type_cd = context.code;
 
    query += `\nand sensor_type_cd = :sensor_type_cd`;
  }

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
