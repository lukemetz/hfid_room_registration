'use strict';

/* Controllers */

function AppCtrl($scope, $http) {
  $http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!'
  });
}

function MyCtrl1() {}
MyCtrl1.$inject = [];

var HomeController = function($scope) {
  $scope.room = "any";
  $scope.room = "an33y";
  console.log("in home")

}

var CalController = function($scope) {
  $scope.room = "";
  $scope.weekly = false;
  console.log("in calendar")

}


function MyCtrl2() {
}
MyCtrl2.$inject = [];

var ConfirmController = function($scope) {
}
var RoomSelectController = function($scope, RoomsFactory, defaultFilter) {
  $scope.rooms = RoomsFactory.getRooms();
  $scope.filter = defaultFilter;
  $scope.validRooms = function(room) {
    console.log(room);
    return true;
  };
  console.log($scope.filter);

}
