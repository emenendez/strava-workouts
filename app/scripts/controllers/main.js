'use strict';

/**
 * @ngdoc function
 * @name stravaWorkoutsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stravaWorkoutsApp
 */
angular.module('stravaWorkoutsApp')
  .controller('MainCtrl', function ($scope) {

  	// TODO: Authenticate with Strava here.
  	// 
    $scope.swims = [1, 2];
    $scope.bikes = [1, 2, 3];
    $scope.runs = [1];
  });
