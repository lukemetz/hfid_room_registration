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
  }])
.controller("CalController", ["$scope", function($scope) {
  var curDate = new Date();
  var d = curDate.getDate();
  var m = curDate.getMonth();
  var y = curDate.getFullYear();
  /* config object */
  $scope.datePicker = {
    dateFormat: 'mm/dd/yy',
    minDate: curDate
  }

  $scope.startPicker = {
    dateFormat: 'mm/dd/yy',
    minDate: curDate
  }

  $scope.endPicker = {
    dateFormat: 'mm/dd/yy',
    minDate: curDate
  }
  $scope.dateChange = function(dateString) {
    if(dateString !== 0) {
      var month = parseInt(dateString.substring(0,2));
      var day = parseInt(dateString.substring(3,5));
      var year = parseInt(dateString.substring(6));
      $scope.myCalendar.fullCalendar('gotoDate',year,month-1,day);
    }
  };
  $scope.events = [
  {title: 'Long Event',start: new Date(2013, 10, 13, 17, 0), end: new Date(2013, 10, 13,20,0), allDay: false},
  {id: 999,title: 'Repeating Event',start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 30), allDay: false},
  {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 7, 10, 0), end: new Date(y, m, d + 7, 12, 30), allDay: false},
  {title: 'Birthday Party',start: new Date(y, m, d + 1, 7, 0),end: new Date(y, m, d + 1, 10, 30),allDay: false},
  ];
  $scope.uiConfig = {
    calendar:{
      height: 450,
      minTime: 6,
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
      columnFormat:{
        week: "ddd M/d"
      },
    }
  };
  /* event sources array*/
  $scope.eventSources = [$scope.events];
  $scope.forceFront = function() {
    $("#ui-datepicker-div").zIndex(10);
  }
  $scope.swapView = function(recurring) {
    if(recurring){
      $scope.uiConfig.calendar.header = false;
      $scope.uiConfig.calendar.allDaySlot = false;
      $scope.uiConfig.calendar.columnFormat = {week: "ddd"}
    }
    if(!recurring){
      $scope.uiConfig.calendar.allDaySlot = true;
      $scope.uiConfig.calendar.header = {left: "",center: "title", right: "today prev next"};
      $scope.uiConfig.calendar.columnFormat = {week: "ddd M/d"};
    }
  }
  $scope.renderRecur = function(startDateString, endDateString){
    var startMonth = parseInt(startDateString.substring(0,2));
    var startDay = parseInt(startDateString.substring(3,5));
    var startYear = parseInt(startDateString.substring(6));
    var startDate = new Date(startYear, startMonth-1, startDay);
    $("#end-input").datepicker("option", "minDate",startDate);
    var endMonth = parseInt(endDateString.substring(0,2));
    var endDay = parseInt(endDateString.substring(3,5));
    var endYear = parseInt(endDateString.substring(6));
    var endDate = new Date(endYear, endMonth-1, endDay)
    $("#start-input").datepicker("option", "maxDate",endDate);
    if(startDateString.length == 10 || endDateString.length == 10){
      var eventList = $scope.events;
      var dateSlices = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []}; // breaking points for heatmap events
      var validEvents = []; // events that fall into the specified range
      var overlay = [];
      for(var n=0; n < eventList.length; n++){
        var eventStart = new Date(eventList[n].start.toISOString())
        var eventEnd = new Date(eventList[n].end.toISOString())
        if(eventStart >= startDate && eventEnd <= endDate) {
          validEvents.push(eventList[n])
          var day = eventStart.getDay()
          dateSlices[day].push([eventStart.getHours(), eventStart.getMinutes()]);
          dateSlices[day].push([eventEnd.getHours(), eventEnd.getMinutes()]);
        }
      }
      for(var a=0; a<7; a++) {
        for(var b=0; b<dateSlices[a].length-1;b++){
          var ev = {start: new Date(2013,11,10+a,dateSlices[a][b][0], dateSlices[a][b][1]), end: new Date(2013,11,10+a,dateSlices[a][b+1][0], dateSlices[a][b+1][1]), allDay: false, conflicts: 0}
          for(var k=0; k<validEvents.length;k++) {
            var curEv = validEvents[k];
            if(curEv.start.getDay() == a && (curEv.start.getHours() < ev.start.getHours() || (curEv.start.getHours() == ev.start.getHours() && curEv.start.getMinutes() <= ev.start.getMinutes())) && (curEv.end.getHours() > ev.end.getHours() || (curEv.end.getHours() == ev.end.getHours() && curEv.end.getMinutes() >= ev.end.getMinutes()))) {
              ev.conflicts++;
            }
          }
          overlay.push(ev);
          console.log(ev);
        }
      }
    }
  }
}])
              .controller("ConfirmController", ["$scop", "ConfirmFactory","$location", "UserFactory",
                function($scope, ConfirmFactory, $location, UserFactory) {
                  $scope.roomName = ConfirmFactory.getCurrent().room
                  $scope.date = ConfirmFactory.getCurrent().on
                  $scope.time = ConfirmFactory.getCurrent().at
                  $scope.name = UserFactory.name;
                  $scope.email = UserFactory.email;

                  $scope.backButton = function() {
                    $location.path('/#/roomSelect');
                  }

                  $scope.confirmButton = function() {
                    $location.path('/');
                    UserFactory.addReservation({name:$scope.roomName, date: $scope.date, time: $scope.time});
                    UserFactory.alertOpen = true;
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





