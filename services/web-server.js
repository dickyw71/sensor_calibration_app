const http = require('http');
const express = require('express');
const morgan = require('morgan');
const webServerConfig = require('../config/web-server.js');
const database = require('./database.js');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    app.get('/', async (req, res) => {
      const result = await database.simpleExecute(
        `SELECT sensor_type_cd
                , sensor_type_sdesc
              FROM ref_sensor_type`
	  );

      const sensor_type = result.rows[0].SENSOR_TYPE_CD;
      const sensor_desc = result.rows[0].SENSOR_TYPE_SDESC;

      res.end(`${sensor_type}  ${sensor_desc}`);
    });

    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);

        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;
