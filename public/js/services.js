'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')

  .factory("RoomsFactory", function() {
    var RoomsFactory = {};
    RoomsFactory.getRooms = function() {
      return [
        {name:"AC102", building:"AC", capacity:1},
        {name:"AC103", building:"AC", capacity:2},
        {name:"AC104", building:"AC", capacity:9},
        {name:"AC105", building:"AC", capacity:3},
        {name:"AC106", building:"AC", capacity:7}
      ];
    }
    return RoomsFactory;
  });
