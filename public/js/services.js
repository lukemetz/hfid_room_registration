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

    RoomsFactory.getRoomsAsync = function(func) {
      $http({method:"GET", url: "/api/rooms"})
      .success(function(data, status, headers, config) {
        func(data);
      });

    };
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
  .factory("UserFactory", function() {
    var UserFactory = {};
    UserFactory.reservations = [
    ];
    UserFactory.currentEvents = [
      {name:"OFAC", date:"10/12/13", start:"9:00AM", end:"10:00AM", location:"lotD"},
      {name:"Career Fair", date:"12/12/13", start:"11:00AM", end:"10:00AM", location:"Mez"},
      {name:"Microsoft Tech Talk", date:"13/12/13", start:"7:00PM", end:"8:00PM", location:"AC 107"}
    ];
    UserFactory.name = "Sam";
    UserFactory.email = "sam@someEmail.com"

    UserFactory.alertOpen = false;
    UserFactory.addReservation = function(reservation) {
      UserFactory.reservations.push(reservation);
    }
    return UserFactory;
  })


  .factory("ReservationsFactory", ["$http", function($http) {
    var ReservationsFactory = {};
    ReservationsFactory.getReservations = function() {
      if (ReservationsFactory.reservations !== undefined) {
        return ReservationsFactory.reservations;
      }
      var reservations = []
      $http({method:"GET", url: "/api/reservations"})
      .success(function(data, status, headers, config) {
        angular.forEach(data, function(reservation) {
          reservations.push(reservation);
        })
      });
      ReservationsFactory.reservations = reservations;
      return reservations;
    }
    ReservationsFactory.addReservation = function(reservation) {
      var reservations = []
      $http({method:"POST", url: "/api/add_reservations"})
      .success(function(data, status, headers, config) {
        angular.forEach(data, function(reservation) {
          reservations.push(reservation);
        })
      });
      ReservationsFactory.reservations = reservations;
    }
    return ReservationsFactory;
  }])

