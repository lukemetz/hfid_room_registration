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
  .controller("ConfirmController", ["$scope", "ConfirmFactory","$location", function($scope, ConfirmFactory, $location) {
    $scope.roomName = ConfirmFactory.getCurrent().room
    $scope.date = ConfirmFactory.getCurrent().on
    $scope.time = ConfirmFactory.getCurrent().at

    $scope.backButton = function() {
      $location.path('/#/roomSelect');
    }

    $scope.confirmButton = function() {
      $location.path('/');
    }
  }])

  .controller("RoomSelectController", ["$scope", "$location", "RoomsFactory", "defaultFilter", "ConfirmFactory",
      function($scope, $location, RoomsFactory, defaultFilter, ConfirmFactory) {
    $scope.rooms = RoomsFactory.getRooms();
    $scope.filter = defaultFilter;
    $scope.submit = function(roomName) {
      ConfirmFactory.setCurrent({room:roomName, on:$scope.date, at:$scope.start});
    }
  }])

  .controller("ConflictPageController", ["$scope", "RoomsFactory", "defaultFilter",  function($scope, RoomsFactory, defaultFilter) {
    $scope.filter = defaultFilter
    $scope.reses = [{name: "Meeting for HFID",
                      room: "AC 109",
                      date: "11/12",
                      time: 15,
                      end: 17,
                      duration: 2,
                      conflicted: false,
                      _id: "first"},
                    {name: "Meeting for HFID",
                      room: "AC 109",
                      date: "11/19",
                      time: 15,
                      end: 17,
                      duration: 2,
                      conflicted: true,
                      _id: "second"},
                    {name: "Meeting for HFID",
                      room: "AC 109",
                      date: "11/26",
                      time: 15,
                      end: 17,
                      duration: 2,
                      conflicted: false,
                      _id: "third"},
                    {name: "Meeting for HFID",
                      room: "AC 109",
                      date: "12/3",
                      time: 15,
                      end: 17,
                      duration: 2,
                      _id: "fourth",
                      conflicted: false}];


    $scope.skipFunction = function(conflictedId) {
      console.log(conflictedId);
      console.log("KEELY");
    }
  }]);





