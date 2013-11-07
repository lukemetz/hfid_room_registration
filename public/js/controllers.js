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
  .controller("HomeController", ["$scope", "UserFactory", function($scope, UserFactory) {
    $scope.room = "any";
    $scope.currentEvents = UserFactory.currentEvents;
    $scope.reservations = UserFactory.reservations;
    $scope.cancel = function(index) {
      if (confirm("Are you sure")) { //Really, I used system popups....
        $scope.reservations.splice(index,1);
      }
    }
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
  .controller("ConfirmController", ["$scope", "ConfirmFactory","$location", "UserFactory",
      function($scope, ConfirmFactory, $location, UserFactory) {
    $scope.roomName = ConfirmFactory.getCurrent().room
    $scope.date = ConfirmFactory.getCurrent().on
    $scope.time = ConfirmFactory.getCurrent().at

    $scope.backButton = function() {
      $location.path('/#/roomSelect');
    }

    $scope.confirmButton = function() {
      $location.path('/');
      UserFactory.addReservation({name:$scope.roomName, date: $scope.date, time: $scope.time});
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





