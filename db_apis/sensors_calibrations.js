const database = require('../services/database.js');

const countQuery =
 `select count(*) as "total"
  from sensor_calibration
  where 1 = 1`;

const basicQuery =
 `select sensor_cal_id "sensor_cal_id",
    most_recent_cal_flag "most_recent_cal_flag",
    cert_no "cert_no"		
  from sensor_calibration
  where 1 = 1`;

const fullQuery =
 `select sensor_cal_id "sensor_cal_id",
    sensor_id "sensor_id",
    sensor_cal_notes "sensor_cal_notes",
    most_recent_cal_flag "most_recent_cal_flag",
    legacy_table_type_id "legacy_table_type_id",
    legacy_mod_date "legacy_mod_date",  
    legacy_cal_date "legacy_cal_date",				    
    legacy_exp_date "legacy_exp_date",				  
    accepted_by "accepted_by",					 
    cal_date "cal_date",					
    adjusted "adjusted",				
    adjustments "adjustments",			
    calibrated_by "calibrated_by",					  
    error_rep_no "error_rep_no",					 
    extension_period "extension_period",				
    cal_extension "cal_extension",				
    concession_no "concession_no",			
    cert_no "cert_no",		
    limit_use "limit_use",	
    temp_degc "temp_degc",
    rel_humidity "rel_humidity",	
    cal_final "cal_final",			
    prev_cert_no "prev_cert_no",			
    quarantined "quarantined",			
    accepted_date "accepted_date",			
    cal_authority "cal_authority",		
    cal_period "cal_period",		
    file_format "file_format",	
    file_format_rev "file_format_rev",	
    file_name "file_name",		
    shelf_life "shelf_life",		
    error_rep "error_rep",		
    circulation "circulation",		
    equip_range "equip_range",		
    equip_accuracy "equip_accuracy", 
    cal_uncert "cal_uncert",			
    cal_type "cal_type",			
    ccp_ref "ccp_ref",			
    lcp_ref "lcp_ref",		
    cal_status_cd "cal_status_cd",	
    intended_use "intended_use",	
    cal_category_cd "cal_category_cd",
    obsolete_flag "obsolete_flag",	
    creation_dt "creation_dt",	
    revision_dt "revision_dt",	
    revision_user "revision_user",	
    customer "customer",
    location "location",
    misc1 "misc1",	
    misc2 "misc2",
    misc3 "misc3",	
    misc4 "misc4",	
    misc5 "misc5",	
    misc6 "misc6"	
  from sensor_calibration
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

  if (context.sensor_id) {
    binds.sensor_id = context.sensor_id;
 
    query += `\nand sensor_id = :sensor_id`;
  }

  if (context.cal_id) {
    binds.sensor_cal_id = context.cal_id;

    query += `\nand sensor_cal_id = :sensor_cal_id`;
  }

  query += '\norder by sensor_cal_id desc';

  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
