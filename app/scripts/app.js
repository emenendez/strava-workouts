'use strict';

/**
 * @ngdoc overview
 * @name stravaWorkoutsApp
 * @description
 * # stravaWorkoutsApp
 *
 * Main module of the application.
 */
var app = angular
  .module('stravaWorkoutsApp', [
    'ngResource',
    'ngTouch'
  ]);

app.directive('progressBar', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@',
            workouts: '='
        },
        templateUrl: 'progress-bar.html',
        controller: function ($scope) {
            $scope.incomplete = [1, 2, 3];
        }
        // link: function ($scope, element, attrs) { } //DOM manipulation
    };
});
