'use strict';

var Knex      = require('knex');
var config    = require('config');
var knex      = new Knex(config.db);

module.exports.knex = knex;
