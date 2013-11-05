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
      angular.forEach(rooms, function(room) {
        if (filter.building[room.building] == true) {
          filtered.push(room);
        }
      });
      return filtered;
    }
  });
