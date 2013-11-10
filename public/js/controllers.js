'use strict';

/* Controllers */

angular.module("myApp.controllers", ['ui.calendar']).
  controller("AppCtrl", ["$scope", "UserFactory", "$http", function($scope, UserFactory, $http) {
    $scope.name = UserFactory.name;
  }])
  .controller("HomeController", ["$scope", "UserFactory", function($scope, UserFactory) {
    $scope.room = "any";
    $scope.currentEvents = UserFactory.currentEvents;
    $scope.reservations = UserFactory.reservations;
    $scope.alertOpen = UserFactory.alertOpen;
    //UserFactory.alertOpen = false;
    $scope.closeAlert = function() {
      $scope.alertOpen = false;
    }
    $scope.cancel = function(index) {
      if (confirm("Are you sure")) { //Really, I used system popups....
        $scope.reservations.splice(index,1);
      }
    }
    function TypeaheadCtrl($scope) {
        $scope.selected = undefined;
        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    }

    $scope.forwardRoom = function() {
      UserFactory.selectedRoom = $scope.room
    }
  }])
  .controller("CalController", ["$scope", "UserFactory", function($scope, UserFactory) {
    /* config object */
    $scope.datePicker = {
      dateFormat: 'mm/dd/yy'
    }
    $scope.room = UserFactory.selectedRoom

    $scope.recurringEnabled = true;
    $scope.dateChange = function(dateString) {
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
    $scope.forceFront = function() {
      $("#ui-datepicker-div").zIndex(10);
    }
    /* event sources array*/
    $scope.eventSources = [$scope.events];
  }])
  .controller("ConfirmController", ["$scope", "ConfirmFactory","$location", "UserFactory",
      function($scope, ConfirmFactory, $location, UserFactory) {
    $scope.reservations = ConfirmFactory.recurringCurrent;
    $scope.roomName = ConfirmFactory.getCurrent().room
    $scope.date = ConfirmFactory.getCurrent().on
    $scope.time = ConfirmFactory.getCurrent().at
    $scope.name = UserFactory.name;
    $scope.email = UserFactory.email;

    $scope.backButton = function() {
      $location.path('/#/roomSelect');
    }

    $scope.confirmButton = function() {
      $location.path('#/home');
      UserFactory.addReservation({name:$scope.roomName, date: $scope.date, time: $scope.time});
      UserFactory.alertOpen = true;
    }
  }])

  .controller("RoomSelectController", ["$scope", "$location", "RoomsFactory", "defaultFilter", "ConfirmFactory",
      function($scope, $location, RoomsFactory, defaultFilter, ConfirmFactory) {
    $scope.rooms = RoomsFactory.getRooms();
    $scope.filter = defaultFilter;
    $scope.recurring = false;
    $scope.submit = function(roomName) {
      ConfirmFactory.setCurrent({room:roomName, on:$scope.date, at:$scope.start});
        if ($scope.recurring) {
          ConfirmFactory.recurringCurrent = [{name: "Meeting for HFID",
                      room: "AC 109",
                      date: "11/12",
                      start: 15,
                      end: 17
                      },
                    {name: "Meeting for HFID",
                      room: "AC 109",
                      date: "11/19",
                      start: 15,
                      end: 17
                      },
                    {name: "Meeting for HFID",
                      room: "AC 109",
                      date: "11/26",
                      start: 15,
                      end: 17
                      },
                    {name: "Meeting for HFID",
                      room: "AC 109",
                      date: "12/3",
                      start: 15,
                      end: 1,
                      }];
        }
      $location.path('confirm');
    }
    $scope.update = function(recurring) {
      $scope.recurring = !recurring;
    }
    $scope.recurringEnabled = true;
  }])

  .controller("ConflictPageController", ["$scope", "RoomsFactory", "defaultFilter", "$location",
      function($scope, RoomsFactory, defaultFilter, $location) {
    $scope.filter = defaultFilter
    $scope.rooms = RoomsFactory.getRooms();
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
    $scope.selectedConflict = 1;

    $scope.countConflicted = function(reses) {
      var count = 0;
      angular.forEach(reses, function(res) {
        if (true == res.conflicted) {
          count += 1;
        }
      })
      return count;
    }
    $scope.changeRoom = function(idx) {
      $scope.view = "roomselect"
      $scope.start = $scope.reses[idx].time;
      $scope.durration = $scope.reses[idx].end - $scope.reses[idx].time;
      $scope.date= $scope.reses[idx].date;
      $scope.selectedConflict = idx;
      $scope.submit = $scope.roomSelectSubmit;
    }
    $scope.changeTime = function(idx) {
      $scope.view = "calendar"
      $scope.selectedConflict = idx;
      $scope.submit = $scope.calendarSelectSubmit;
    }

    $scope.roomSelectSubmit = function(roomName) {
      $scope.reses[$scope.selectedConflict].conflicted = false;
      $scope.reses[$scope.selectedConflict].date = $scope.date;
      $scope.reses[$scope.selectedConflict].room = roomName;
      $scope.view = "";
    }

    $scope.calendarSelectSubmit = function(roomName) {
    }

    $scope.skipFunction = function(conflictedId) {
      $scope.reses[conflictedId].conflicted = false;
      $scope.reses[conflictedId].ignore = true;
    }

    $scope.recurringEnabled = false;
  }]);





