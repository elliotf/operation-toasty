'use strict';

var config = require('config');
var db     = require('../db');

var helper    = require('./helper');
var expect    = helper.expect;
var resources = require('../resources');

describe('resources/recorder', function() {
  describe('.recordSensorValue', function() {
    it('creates the sensor', function(done) {
      resources.Recorder.recordSensorValue('temperature', '1qrt5', 50.02, function(err, result) {
        expect(err).to.not.exist();

        db.knex
          .select('type', 'identifier', 'name')
          .from('sensors')
          .nodeify(function(err, rows) {
            expect(err).to.not.exist();

            expect(rows).to.deep.equal([
              {
                type:       'temperature',
                identifier: '1qrt5',
                name:       null,
              }
            ]);

            return done();
          });
      });
    });

    it.skip('records the sensor values', function(done) {
    });

    context('when the sensor already exists', function() {
      var sensor_id;

      beforeEach(function(done) {
        var sensor_attrs = {
          type:       'temperature',
          identifier: '1qrt5',
          created_at: new Date(),
          updated_at: new Date(),
        };

        db.knex
          .insert(sensor_attrs)
          .into('sensors')
          .nodeify(function(err, result) {
            if (err) {
              return done(err);
            }

            sensor_id = result[0];

            return done();
          });
      });

      it('reuses the existing sensor', function(done) {
        resources.Recorder.recordSensorValue('temperature', '1qrt5', 50.02, function(err, result) {
          expect(err).to.not.exist();

          db.knex
            .select('id', 'type', 'identifier', 'name')
            .from('sensors')
            .nodeify(function(err, rows) {
              expect(err).to.not.exist();

              expect(rows).to.deep.equal([
                {
                  id:         sensor_id,
                  type:       'temperature',
                  identifier: '1qrt5',
                  name:       null,
                }
              ]);

              return done();
            });
        });
      });
    });

  });
});

