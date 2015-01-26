//CUMTD api key
var apiKey = '3faf9283b96b4ea1bb5ec0c049c45f0c';

var version = 'v2.2';
var format = 'json';

//CUMTD url
var url = 'https://developer.cumtd.com/api/' + version + '/' + format + '/';

//bus stop id, hard coded for now
var stopId = 'IT';

angular.module('stuffService', [])
	.factory('Stuff', function ($http) {
		
		//create the object
		var myFactory = {};

		//a function to get all the stuff
		myFactory.all = function(){
			return $http.get(url + 'GetDeparturesByStop?' + 'key=' + apiKey + '&stop_id=' + stopId);
		}

		return myFactory;
	});