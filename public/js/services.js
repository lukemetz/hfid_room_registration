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
      },
      features: {
        BlackoutCapability: false,
        HandicapAccessability: false,
        Softseating: false,
        TablesChairs: false,
        Whiteboards: false,
        Blackboards: false,
        ProjectionScreen: false,
        LCDProjector: false,
        CarpetFlooring: false,
        TileFlooring: false,
        Multimedia: false,
        Benches: false,
        Podium: false,
        TieredSeating: false,
        DoNotRearrange: false
      },
      capacity: {
        min: "",
        max: ""
      }
  })
    .factory("ConfirmFactory", function() {
    var ConfirmFactory = {};
    ConfirmFactory.current = {room:"", at:"", on:""};
    ConfirmFactory.setCurrent = function(current) {
      ConfirmFactory.current = current;
    }
    ConfirmFactory.getCurrent = function() {
      return ConfirmFactory.current;
    }
    return ConfirmFactory;
  })
