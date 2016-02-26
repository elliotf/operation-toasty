'use strict';

var config = require('config');
var db     = require('../db');

var helper    = require('./helper');
var expect    = helper.expect;
var resources = require('../resources');

describe.skip('resources/thermostat', function() {
  var attrs;

  beforeEach(function() {
    attrs = {
      target:  68,
      furnace: new Furnace(),
    };
  });

  it('can be instantiated', function(done) {
    var therm = new Thermostat(attrs);
  });

  describe('#adjustTemperature', function() {
    context('when the temperature is above target', function() {
      it('sets the heat to "off"', function(done) {
      });
    });

    context('when the temperature is below target', function() {
      it('sets the heat to "on"', function(done) {
      });
    });
  });
});
