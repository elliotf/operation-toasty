'use strict';

var fs   = require('fs');
var path = require('path');
var _str = require('underscore.string');

var files = fs.readdirSync(__dirname);

files.forEach(function(filename) {
  if (filename === path.basename(__filename)) {
    return;
  }

  var name = _str.classify(path.basename(filename, '.js'));

  module.exports[name] = require('./' + filename);
});
