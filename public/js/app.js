'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {templateUrl: 'partial/home', controller: HomeController});
    $routeProvider.when('/calendar', {templateUrl: 'partial/calendar', controller: CalController});
    $routeProvider.when('/confirm', {templateUrl: 'partial/confirm', controller: ConfirmController});
    $routeProvider.when('/roomSelect', {templateUrl: 'partial/roomselect', controller:RoomSelectController});
    $routeProvider.otherwise({redirectTo: '/home'});
    $locationProvider.html5Mode(true);
  }]);