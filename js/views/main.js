'use strict';

/*global m */

function ThermostatModel() {
  this.target_temperature  =  68,

  this.warmer = function() {
    this.target_temperature++;
  }.bind(this);

  this.cooler = function() {
    this.target_temperature--;
  }.bind(this);

  this.current_time = moment();

  this.date = function() {
    return this.current_time.format('MMM Do YYYY');
  }.bind(this);

  this.time = function() {
    return this.current_time.format('h:mm A');
  }.bind(this);

  setInterval(function() {
    this.current_time = moment();
    m.redraw();
  }.bind(this),1000*30);
}

var app = {
  controller: function() {
    this.thermostat = new ThermostatModel();
  },
  view: function(ctrl) {
    return [
      m("div.container", [
        m("div.controls", [
          m("div.material-icons.button.up", { onclick: ctrl.thermostat.warmer }, "add"),
          m("div.material-icons.button.down", { onclick: ctrl.thermostat.cooler }, "remove"),
          m("div.target.temp", {}, ctrl.thermostat.target_temperature),
        ]),
        //m("div.current.temp", {}, "63"),
        //m("div.outside.temp", {}, "18"),
        m("div.clock", [
          m("div.date", {}, ctrl.thermostat.date() ),
          m("div.time", {}, ctrl.thermostat.time() ),
        ]),
      ])
    ];
  }
};

m.module(document.getElementById('spike'), { controller: app.controller, view: app.view });
