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
    $scope.dateChange = function(dateString) {
      console.log(dateString);
      if(dateString !== 0) {
        var month = parseInt(dateString.substring(0,2));
        var day = parseInt(dateString.substring(3,5));
        var year = parseInt(dateString.substring(6));
        $scope.myCalendar.fullCalendar('gotoDate',year,month-1,day);
     }
    };
    $scope.events = [];
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        selectable: true,
        selectHelper: true,
        select: function(startDate, endDate, allDay, jsEvent, view) {
          alert("Date selected");
        },
        defaultView: "agendaWeek",
        header:{
          left: '',
          center: 'title',
          right: 'today prev next'
        },
      }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events];
  }])
  .controller("ConfirmController", ["$scope", "ConfirmFactory", function($scope, ConfirmFactory) {
    $scope.roomName = ConfirmFactory.getCurrent().room
    $scope.date = ConfirmFactory.getCurrent().on
    $scope.time = ConfirmFactory.getCurrent().at
  }])
  .controller("RoomSelectController", ["$scope", "RoomsFactory", "defaultFilter",  function($scope, RoomsFactory, defaultFilter) {
    $scope.rooms = RoomsFactory.getRooms();
    $scope.filter = defaultFilter;
  }]);
