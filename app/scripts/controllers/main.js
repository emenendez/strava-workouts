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
  .controller('MainCtrl', function ($scope, $location, $window, $http) {

    // Figure out date of this past Monday
    var monday = new Date();
    var delta = monday.getDay() - 1;
    if (delta === -1) delta = 6;
    monday.setDate(monday.getDate() - delta);
    monday.setHours(0, 0, 0, 0);

    $scope.start = monday;

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
            var access_token = angular.fromJson(data.Payload).access_token;

            // 6. Retrieve list of Strava workouts since this past Monday
            $http.jsonp('https://www.strava.com/api/v3/athlete/activities',
              {
                params: {
                  access_token: access_token,
                  callback: 'JSON_CALLBACK',
                  after: (Math.floor(monday.getTime() / 1000))
                }
              }).
              success(function(data, status, headers, config) {
                // 7. Iterate through list of activities and add to proper scope variable
                $scope.activities = {};

                for (var i = 0; i < data.length; ++i) {
                  var activity = data[i];

                  if (!$scope.activities[activity.type]) {
                    $scope.activities[activity.type] = []
                  }
                  $scope.activities[activity.type].push(activity);
                }

              }).
              error(function(data, status, headers, config) {
                // TODO: handle gracefully
                console.log(data);
              });

          }
        }
      );
  	}
  	else {
  		// 1. Page redirects to strava auth endpoint
  		$window.location.href = 'https://www.strava.com/oauth/authorize?client_id=6518&response_type=code&redirect_uri=http://emenendez.github.io/strava-workouts/';
  		return;
  	}
  	
  });
