'use strict';

var Promise = require('bluebird');
var chai    = require('chai');
var config  = require('config');
var db      = require('../db');
chai.use(require('dirty-chai'));
chai.use(require('sinon-chai'));
chai.config.includeStack = true;

require('mocha-sinon');

var expect            = chai.expect;
module.exports.chai   = chai;
module.exports.expect = expect;

before(function(done) {
  db.knex.migrate
    .latest(config.db)
    .nodeify(function(err) {
      expect(err).to.not.exist();

      return done();
    });
});

beforeEach(function(done) {
  var tables = [
    'sensors',
  ];
  Promise
    .map(tables, function(table) {
      return db.knex(table).del();
    })
    .nodeify(function(err) {
      expect(err).to.not.exist();

      return done();
    });
});
