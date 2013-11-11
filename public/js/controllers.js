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
.controller("CalController", ["$scope", "$location", "UserFactory", "defaultFilter", "ConfirmFactory",
 function($scope, $location, UserFactory, defaultFilter, ConfirmFactory) {
  $scope.recurDays = [0, 0, 0, 0, 0, 0, 0]
  $scope.room = UserFactory.selectedRoom

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
  {title: 'Meeting',start: new Date(y, m-1, d, 17, 0), end: new Date(y, m-1, 13,20,0), allDay: false},
  {title: 'HFID Meeting',start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 30), allDay: false},
  {title: 'Class',start: new Date(y, m, d + 7, 10, 0), end: new Date(y, m, d + 7, 12, 30), allDay: false},
  {title: 'Meeting',start: new Date(y, m, d + 1, 7, 0),end: new Date(y, m, d + 1, 10, 30),allDay: false},
  ];
  $scope.uiConfig = {
    calendar:{
      height: 450,
      minTime: 6,
      editable: true,
      selectable: true,
      selectHelper: true,
      select: function(startDate, endDate, allDay, jsEvent, view) {
        $scope.startTime = startDate;
        $scope.endTime = endDate;
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
      eventRender: function(event, element) {
        element.attr('title', event.conflictString);
      }
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
      $scope.uiConfig.calendar.year = 3000;
      $scope.uiConfig.calendar.month = 0;
      $scope.uiConfig.calendar.date = 5;      
    }
    if(!recurring){
      $scope.uiConfig.calendar.allDaySlot = true;
      $scope.uiConfig.calendar.header = {left: "",center: "title", right: "today prev next"};
      $scope.uiConfig.calendar.columnFormat = {week: "ddd M/d"};
      $scope.uiConfig.calendar.year = y;
      $scope.uiConfig.calendar.month = m;
      $scope.uiConfig.calendar.date = d;      
    }
  }
  $scope.renderRecur = function(startDateString, endDateString){
    $scope.myCalendar.fullCalendar("removeEventSource", $scope.overlay);
    var fillColors = ['#FFFF66', '#FFE85E', '#FFD156', '#FFBA4E', '#FFA347', '#FF8C3F', '#FF7537', '#FF5E30', '#FF4728', '#FF3020', '#FF1919'];
    var borderColors = ['#FF9900', '#F28900', '#E57A00', '#D86B00', '#CC5B00', '#BF4C00', '#B23D00', '#A62D00', '#991E00', '#8C0F00', '#800000'];
    var startMonth = parseInt(startDateString.substring(0,2));
    var startDay = parseInt(startDateString.substring(3,5));
    var startYear = parseInt(startDateString.substring(6));
    $scope.startDate = new Date(startYear, startMonth-1, startDay);
    $("#end-input").datepicker("option", "minDate",$scope.startDate);
    var endMonth = parseInt(endDateString.substring(0,2));
    var endDay = parseInt(endDateString.substring(3,5));
    var endYear = parseInt(endDateString.substring(6));
    $scope.endDate = new Date(endYear, endMonth-1, endDay)
    $("#start-input").datepicker("option", "maxDate",$scope.endDate);
    if(startDateString.length == 10 || endDateString.length == 10){
      var eventList = $scope.events;
      var dateSlices = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []}; // breaking points for heatmap events
      var validEvents = []; // events that fall into the specified range
      $scope.overlay = [];
      for(var n=0; n < eventList.length; n++){
        var eventStart = new Date(eventList[n].start.toISOString())
        var eventEnd = new Date(eventList[n].end.toISOString())
        if(eventStart >= $scope.startDate && eventEnd <= $scope.endDate) {
          validEvents.push(eventList[n])
          var day = eventStart.getDay()
          dateSlices[day].push([eventStart.getHours(), eventStart.getMinutes()]);
          dateSlices[day].push([eventEnd.getHours(), eventEnd.getMinutes()]);
        }
      }
      for(var a=0; a<7; a++) {
        dateSlices[a].sort((function(index){
          return function(a, b){
            return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
          };
        })(0))
        for(var b=0; b<dateSlices[a].length-1;b++){
          var ev = {conflictString: "0 conflicts", editable: false, start: new Date(3000,0,5+a,dateSlices[a][b][0], dateSlices[a][b][1]), end: new Date(3000,0,5+a,dateSlices[a][b+1][0], dateSlices[a][b+1][1]), allDay: false, conflicts: 0, backgroundColor: fillColors[0], borderColors: borderColors[0], textColor: '#000000'};
          for(var k=0; k<validEvents.length;k++) {
            var curEv = validEvents[k];
            if(curEv.start.getDay() == a && (curEv.start.getHours() < ev.start.getHours() || (curEv.start.getHours() == ev.start.getHours() && curEv.start.getMinutes() <= ev.start.getMinutes())) && (curEv.end.getHours() > ev.end.getHours() || (curEv.end.getHours() == ev.end.getHours() && curEv.end.getMinutes() >= ev.end.getMinutes()))) {
              ev.conflicts++;
              ev.conflictString = ev.conflicts.toString() + " conflicted events"
              ev.backgroundColor = fillColors[ev.conflicts - 1];
              ev.borderColor = borderColors[ev.conflicts - 1]
            }
          }
          $scope.overlay.push(ev);
        }
      }
      $scope.myCalendar.fullCalendar("addEventSource", $scope.overlay);
    }
  }
  $scope.submit = function() {
    ConfirmFactory.setCurrent({room:$scope.room, on:$scope.startTime.toLocaleDateString(), at:$scope.startTime.toLocaleTgiimeString()});
    if ($scope.recurring) {
      ConfirmFactory.recurringCurrent = [];
      var date = new Date($scope.startDate.toString())
      while(date < $scope.endDate){
        if($scope.recurDays[date.getDay()]){
          date.setDate(date.getDate() + 7);
          var ev = {room:$scope.room, date: date.toLocaleDateString(), start:$scope.startTime.toLocaleTimeString(), end: $scope.endTime.toLocaleTimeString()};
          ConfirmFactory.recurringCurrent.push(ev);
        }
        else{
          date.setDate(date.getDate() + 1);
        }
      }
    }
    $location.path('confirm');
  }
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

.controller("ConflictPageController", ["$scope", "RoomsFactory", "defaultFilter", "$location", "ConfirmFactory",
  function($scope, RoomsFactory, defaultFilter, $location, ConfirmFactory) {
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

    $scope.confirm = function() {
      ConfirmFactory.recurringCurrent = []
      angular.forEach($scope.reses, function(res) {
        if (res.conflicted == false && !res.ignore) {
          ConfirmFactory.recurringCurrent.push(res);
        }
      });
    }

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
      $scope.room = $scope.reses[idx].room;
      $scope.submit = $scope.calendarSelectSubmit;
    }

    $scope.roomSelectSubmit = function(roomName) {
      $scope.reses[$scope.selectedConflict].conflicted = false;
      $scope.reses[$scope.selectedConflict].date = $scope.date;
      $scope.reses[$scope.selectedConflict].room = roomName;
      $scope.view = "";
    }

    $scope.calendarSelectSubmit = function(roomName) {
      $scope.reses[$scope.selectedConflict].conflicted = false;
      $scope.reses[$scope.selectedConflict].date = $scope.date;
      $scope.reses[$scope.selectedConflict].room = roomName;
      $scope.view = "";
    }

    $scope.skipFunction = function(conflictedId) {
      $scope.reses[conflictedId].conflicted = false;
      $scope.reses[conflictedId].ignore = true;
    }

    $scope.recurringEnabled = false;
    $scope.recurDays = [0, 0, 0, 0, 0, 0, 0]

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
        $scope.view.myCalendar.fullCalendar('gotoDate',year,month-1,day);
      }
    };
    $scope.events = [
    {title: 'Meeting',start: new Date(y, m-1, d, 17, 0), end: new Date(y, m-1, 13,20,0), allDay: false},
    {title: 'HFID Meeting',start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 30), allDay: false},
    {title: 'Class',start: new Date(y, m, d + 7, 10, 0), end: new Date(y, m, d + 7, 12, 30), allDay: false},
    {title: 'Meeting',start: new Date(y, m, d + 1, 7, 0),end: new Date(y, m, d + 1, 10, 30),allDay: false},
    ];
    $scope.uiConfig = {
      calendar:{
        height: 450,
        minTime: 6,
        editable: true,
        selectable: true,
        selectHelper: true,
        select: function(startDate, endDate, allDay, jsEvent, view) {
          $scope.startTime = startDate;
          $scope.endTime = endDate;
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
        eventRender: function(event, element) {
          element.attr('title', event.conflictString);
        }
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
        $scope.uiConfig.calendar.year = 3000;
        $scope.uiConfig.calendar.month = 0;
        $scope.uiConfig.calendar.date = 5;      
      }
      if(!recurring){
        $scope.uiConfig.calendar.allDaySlot = true;
        $scope.uiConfig.calendar.header = {left: "",center: "title", right: "today prev next"};
        $scope.uiConfig.calendar.columnFormat = {week: "ddd M/d"};
        $scope.uiConfig.calendar.year = y;
        $scope.uiConfig.calendar.month = m;
        $scope.uiConfig.calendar.date = d;      
      }
    }
    $scope.renderRecur = function(startDateString, endDateString){
      $scope.myCalendar.fullCalendar("removeEventSource", $scope.overlay);
      var fillColors = ['#FFFF66', '#FFE85E', '#FFD156', '#FFBA4E', '#FFA347', '#FF8C3F', '#FF7537', '#FF5E30', '#FF4728', '#FF3020', '#FF1919'];
      var borderColors = ['#FF9900', '#F28900', '#E57A00', '#D86B00', '#CC5B00', '#BF4C00', '#B23D00', '#A62D00', '#991E00', '#8C0F00', '#800000'];
      var startMonth = parseInt(startDateString.substring(0,2));
      var startDay = parseInt(startDateString.substring(3,5));
      var startYear = parseInt(startDateString.substring(6));
      $scope.startDate = new Date(startYear, startMonth-1, startDay);
      $("#end-input").datepicker("option", "minDate",$scope.startDate);
      var endMonth = parseInt(endDateString.substring(0,2));
      var endDay = parseInt(endDateString.substring(3,5));
      var endYear = parseInt(endDateString.substring(6));
      $scope.endDate = new Date(endYear, endMonth-1, endDay)
      $("#start-input").datepicker("option", "maxDate",$scope.endDate);
      if(startDateString.length == 10 || endDateString.length == 10){
        var eventList = $scope.events;
      var dateSlices = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []}; // breaking points for heatmap events
      var validEvents = []; // events that fall into the specified range
      $scope.overlay = [];
      for(var n=0; n < eventList.length; n++){
        var eventStart = new Date(eventList[n].start.toISOString())
        var eventEnd = new Date(eventList[n].end.toISOString())
        if(eventStart >= $scope.startDate && eventEnd <= $scope.endDate) {
          validEvents.push(eventList[n])
          var day = eventStart.getDay()
          dateSlices[day].push([eventStart.getHours(), eventStart.getMinutes()]);
          dateSlices[day].push([eventEnd.getHours(), eventEnd.getMinutes()]);
        }
      }
      for(var a=0; a<7; a++) {
        dateSlices[a].sort((function(index){
          return function(a, b){
            return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
          };
        })(0))
        for(var b=0; b<dateSlices[a].length-1;b++){
          var ev = {conflictString: "0 conflicts", editable: false, start: new Date(3000,0,5+a,dateSlices[a][b][0], dateSlices[a][b][1]), end: new Date(3000,0,5+a,dateSlices[a][b+1][0], dateSlices[a][b+1][1]), allDay: false, conflicts: 0, backgroundColor: fillColors[0], borderColors: borderColors[0], textColor: '#000000'};
          for(var k=0; k<validEvents.length;k++) {
            var curEv = validEvents[k];
            if(curEv.start.getDay() == a && (curEv.start.getHours() < ev.start.getHours() || (curEv.start.getHours() == ev.start.getHours() && curEv.start.getMinutes() <= ev.start.getMinutes())) && (curEv.end.getHours() > ev.end.getHours() || (curEv.end.getHours() == ev.end.getHours() && curEv.end.getMinutes() >= ev.end.getMinutes()))) {
              ev.conflicts++;
              ev.conflictString = ev.conflicts.toString() + " conflicted events"
              ev.backgroundColor = fillColors[ev.conflicts - 1];
              ev.borderColor = borderColors[ev.conflicts - 1]
            }
          }
          $scope.overlay.push(ev);
        }
      }
      $scope.myCalendar.fullCalendar("addEventSource", $scope.overlay);
    }
  }
  $scope.submit = function() {
    ConfirmFactory.setCurrent({room:$scope.room, on:$scope.startTime.toLocaleDateString(), at:$scope.startTime.toLocaleTgiimeString()});
    if ($scope.recurring) {
      ConfirmFactory.recurringCurrent = [];
      var date = new Date($scope.startDate.toString())
      while(date < $scope.endDate){
        if($scope.recurDays[date.getDay()]){
          date.setDate(date.getDate() + 7);
          var ev = {room:$scope.room, date: date.toLocaleDateString(), start:$scope.startTime.toLocaleTimeString(), end: $scope.endTime.toLocaleTimeString()};
          ConfirmFactory.recurringCurrent.push(ev);
        }
        else{
          date.setDate(date.getDate() + 1);
        }
      }
    }
    $location.path('confirm');
  }
}]);
