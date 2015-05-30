'use strict';

/**
 * @ngdoc function
 * @name stravaWorkoutsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the stravaWorkoutsApp
 */
angular.module('stravaWorkoutsApp')
  .config(function($locationProvider) {
  	$locationProvider.html5Mode(true);
  })
  .controller('MainCtrl', function ($scope, $location, $window) {

  	// Authenticate with Strava
  	// 2. Strava redirects here with access code
  	if ($location.search().code) {
  		// 3. This page calls lambda function with access code
  		AWS.config.update({accessKeyId: 'AKIAJBA62LHLZVTZSJ3A', secretAccessKey: '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'});
      AWS.config.region = 'us-east-1';
      var lambda = new AWS.Lambda();
      lambda.invoke(
        {
          FunctionName: 'stravaWorkoutsGetToken',
          Payload: '{"code": "' + $location.search().code + '"}'
        },
        function(err, data) {
          if (err) {
            // an error occurred
            console.log(err, err.stack);
            // TODO: Handle gracefully
          }
          else {
            // successful response
            // 4. Lambda function knows secret, exchanges code for token with secrent
            // 5. Lambda function returns the token as a parameter
            $scope.access_token = data.Payload;
          }
        }
      );
  	}
  	else {
  		// 1. Page redirects to strava auth endpoint
  		// window.location = 'https://www.strava.com/oauth/authorize?client_id=6518&response_type=code&redirect_uri=http://emenendez.github.io/strava-workouts/';
  		$window.location.href = 'https://www.strava.com/oauth/authorize?client_id=6518&response_type=code&redirect_uri=http://localhost:9000/';
  		return;
  	}
  	
  	// 6. Retrieve list of Strava workouts since this past Monday
    
     
    $scope.swims = [1, 2];
    $scope.bikes = [1, 2, 3];
    $scope.runs = [1];
  });
