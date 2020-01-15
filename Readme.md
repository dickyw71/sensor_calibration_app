# Sensor calibration database REST API
## Description
This project is a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) [API](https://en.wikipedia.org/wiki/Application_programming_interface) that queries an Oracle database of sensor calibration records and returns the query results as JSON-formatted text. [JSON](https://en.wikipedia.org/wiki/JSON) is human-readable, language-independent and most modern programming languages include code to parse JSON text. 

The REST API can used in a web-browser or more typically called by another program, e.g. to fetch data to display in formatted views  or to extract, transform and load the data into another systems. 

## Implementation
The REST API is implemented in JavaScript using the [Express](https://expressjs.com/) web framework for [Node.js](https://nodejs.org) and uses the [node-oracledb](https://oracle.github.io/node-oracledb/) API as a generic Oracle Database access layer. The project structure is closely based on the excellent tutorial, 
[Creating a REST API with Node.js and Oracle Database](https://jsao.io/2018/03/creating-a-rest-api-with-node-js-and-oracle-database/), written by [Dan McGhan](https://twitter.com/dmcghan).


## API URL endpoints
- /api/sensors/:id?
- /api/sensors/:id?view=basic
- /api/sensors/:id?view=full
- /api/sensors/:id?view=count
- /api/sensors/:id?sort=bar_code:asc
- /api/parts/:id?
- /api/parts/:id?view=basic
- /api/parts/:id?view=full
- /api/parts/:id?view=count
- /api/parts/:id?sort=sensor_part_name:asc
- /api/types/:code?
- /api/types/:code?view=basic
- /api/types/:code?view=full
- /api/types/:code?view=count
- /api/types/:code/sensors/?nh_sens_id=null
- /api/types/:code/sensors/?nh_sens_id=null&view=basic
- /api/types/:code/sensors/?nh_sens_id=null&view=full
- /api/types/:code/sensors/?nh_sens_id=null&view=count
- /api/types/:code/parts/:id?
- /api/types/:code/parts/:id?view=basic
- /api/types/:code/parts/:id?view=full
- /api/types/:code/parts/:id?view=count
- /api/parts/:id/sensors/?nh_sens_id=null
- /api/parts/:id/sensors/?nh_sens_id=null&view=basic
- /api/parts/:id/sensors/?nh_sens_id=null&view=full
- /api/parts/:id/sensors/?nh_sens_id=null&view=count
- /api/calibrations/:id?
- /api/calibrations/:id?view=basic
- /api/calibrations/:id?view=full
- /api/calibrations/:id?view=count
- /api/sensors/:sensor_id/calibrations/:cal_id?
- /api/sensors/:sensor_id/calibrations/:cal_id?view=basic
- /api/sensors/:sensor_id/calibrations/:cal_id?view=full
- /api/sensors/:sensor_id/calibrations/:cal_id?view=count
