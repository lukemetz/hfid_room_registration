'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('version', '0.1')
  .factory("RoomsFactory", ["$http", function($http) {
    var RoomsFactory = {};
    RoomsFactory.getRooms = function() {
      var rooms = []
      $http({method:"GET", url: "/api/rooms"})
      .success(function(data, status, headers, config) {
        angular.forEach(data, function(room) {
          rooms.push(room);
        })
      });
      return rooms;
    }
    return RoomsFactory;
  }])
  .value("defaultFilter", {
        building: {
          MH: true,
          AC: true,
          CC: true
      }
  })
    .factory("ConfirmFactory", function() {
    var ConfirmFactory = {};
    ConfirmFactory.setCurrent = function(current) {
      ConfirmFactory.current = current;
    }
    ConfirmFactory.getCurrent = function() {
      ConfirmFactory.current = {room:"AC102", on: "7/27", at: "1:00pm"}
      return ConfirmFactory.current;
    }
    return ConfirmFactory;
  })
