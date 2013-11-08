'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
  .filter("filterRooms", ["ReservationFactory", function(ReservationsFactory) {
    return function(rooms, filter, reservation) {
      var filtered = [];
      //Filter by building name
      var index = 0;
      angular.forEach(rooms, function(room) {
        index += 1;
        var shouldAdd = filter.building[room.building];

        //Filter by Features
        angular.forEach(filter.features, function(value, key) {
          if (value == true) {
            if (room[key] == false) {
              shouldAdd = false;
            }
          }
        })

        //Filter by capacity
        if (room.capacity < parseInt(filter.capacity.min) ||
            room.capacity > parseInt(filter.capacity.max) ) {
          shouldAdd = false;
        }


        //Filter by avalibility. Currently not working, substituting for a sketchy approuch.
        /*var inRange = function(trial, start, end) {
          return trial < end && trial > start;
        }

        var resOverlaps = function(trial, existing) {
          return !(inRange(trial.start, existing.start, existing.end) ||
                   inRange(trial.end, existing.start, existing.end)   ||
                   inRange(existing.start, trial.start, trial.end)    ||
                   inRange(existing.end, trial.start, trial.end) )
        }*/

        /*if (reservation.start && reservation.durration && reservation.date) {

          console.log(reservation);
          reservation.start_h = parseInt(reservation.start)
          reservation.durration_h = parseInt(reservation.durration)
          reservation.start_d = new Date(reservation.date.getTime() + 60*60000*reservation.start_h);
          reservation.end_d = new Date(reservation.date.getTime() + 60*60000*(reservation.start_h + reservation.durration_h));
          angular.forEach(ReservationsFactory.getReservations(), function(existingRes) {
            console.log(existingRes)
            existingRes.start = new Date(existingRes.start)
            existingRes.end = new Date(existingRes.end);
            if (resOverlaps(reservation, existingRes)) {
              console.log(existingRes)
              console.log(reservation)
              console.log("Round room that doesn't work");
              shouldAdd = false;
            }
          });
        } */

        //This is like filtering by avalible time, right???
        if (reservation.start && reservation.durration && reservation.date) {
          if (index % 3 !== 0) {
            shouldAdd = false;
          }
        }

        if (reservation.start && reservation.durration && reservation.date && reservation.recurring) {
          if (index % 2 !== 0) {
            shouldAdd = false;
          }
        }

        if (shouldAdd) {
          filtered.push(room);
        }
      });



      return filtered;
    }
  }]);
