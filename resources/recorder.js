'use strict';

var db = require('../db');

exports.recordSensorValue = function(type, identifier, value, done) {
  var sensor_attrs = {
    type:       type,
    identifier: identifier,
  };

  db.knex
    .select('*')
    .from('sensors')
    .where(sensor_attrs)
    .then(function(rows) {
      if (rows.length) {
        return rows[0];
      }

      sensor_attrs.created_at = new Date();
      sensor_attrs.updated_at = new Date();

      return db.knex
        .insert(sensor_attrs)
        .into('sensors')
        .then(function(result) {
          sensor_attrs.id = result[0];

          return sensor_attrs;
        });
    })
    .nodeify(function(err, result) {
      return done();
    });
};
