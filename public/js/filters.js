'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])
  .filter("filterRooms",function() {
    return function(rooms, filter) {
      var filtered = [];
      var shouldAdd = true;
      angular.forEach(rooms, function(room) {
        if (filter.building[room.building] == true) {
          shouldAdd = true;
        }

        angular.forEach(filter.features, function(value, key) {
          if (value == true) {
            if (room[key] == false) {
              shouldAdd = false;
            }
          }
        })

        if (room.capacity < parseInt(filter.capacity.min) ||
            room.capacity > parseInt(filter.capacity.max) ) {
          shouldAdd = false;
        }

        if (shouldAdd) {
          filtered.push(room);
        }
      });
      return filtered;
    }
  });
