// Exchange Strava auth code for auth token
//  Parameters:
//   code: Strava auth code
exports.handler = function(event, context) {

	var credentials = require('./.env.js');
	var request = require('request');

	request.post(
		{
			url: 'https://www.strava.com/oauth/token',
			form: {
				'client_id': credentials.client_id,
				'client_secret': credentials.client_secret,
				'code': event.code
			},
			json: true
		},
		function(error, response, body) {
			if(!error) {
				context.succeed(body.access_token);
			}
			else {
				context.fail(error);
			}
		}
	);
}
