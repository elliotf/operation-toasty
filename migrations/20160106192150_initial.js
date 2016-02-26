'use strict';

exports.up = function(knex, Promise) {
  var todo = [];

  todo.push(knex.schema.createTable('sensors', function(table) {
    table.increments('id');
    table.enu('type', ['temperature', 'humidity', 'movement', 'status']);
    table.string('identifier');
    table.string('name').nullable();
    table.timestamps();

    //table.unique(['type', 'identifier']);
    //table.unique(['sensor_type_id', 'identifier']);
  }));

  return Promise.all(todo);
};

exports.down = function(knex, Promise) {

};
