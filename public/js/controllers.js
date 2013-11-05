'use strict';

/* Controllers */

angular.module("myApp.controllers", ['ui.calendar']).
  controller("AppCtrl", ["$scope", "$http", function($scope, $http) {
  $http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!'
  });

  }])
  .controller("HomeController", ["$scope", function($scope) {
    $scope.room = "any";
    $scope.room = "an33y";
  }])
  .controller("CalController", ["$scope", function($scope) {
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };
    /* event sources array*/
    $scope.eventSources = [];
  }])
  .controller("ConfirmController", ["$scope", function($scope) {
  }])
  .controller("RoomSelectController", ["$scope", "RoomsFactory", "defaultFilter",  function($scope, RoomsFactory, defaultFilter) {
    $scope.rooms = RoomsFactory.getRooms();
    $scope.filter = defaultFilter;
  }]);
