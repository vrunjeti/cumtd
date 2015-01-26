//CUMTD api key
var apiKey = '3faf9283b96b4ea1bb5ec0c049c45f0c';

var version = 'v2.2';
var format = 'json';

//CUMTD url
var url = 'https://developer.cumtd.com/api/' + version + '/' + format + '/';

//bus stop id, hard coded for now
var stopId = 'IT';

console.log('test');

// name our angular app
angular.module('cumtdApp', [])

	.controller('mainController', [ '$http', '$scope', function ($http, $scope) { //function(Stuff)
		
		//bind this to vm (view-model)
		var vm = this;

		//define variables and objects on this
		//this lets them be available to our views

		vm.message = 'Testing CUMTD API';

		vm.allData = {};

		//gets data

		$scope.load = function() {
			console.log('load button clicked');

			//get all stuff
			// Stuff.all()
			// 	//promise object
			// 	.success(function(data){
			// 		//bind the data to a controller variable
			// 		//this comes from stuffService
			// 		vm.stuff = data;
			// 	});

			
			// $http.get(url + 'GetDeparturesByStop/?' + 'key=' + apiKey + '&stop_id=' + stopId)
			// 	.then(function(data){
			// 		vm.allData = data;
			// 	});
			
			$http
				.get(url + 'GetDeparturesByStop', {
					params: {
						key: apiKey,
						stop_id: stopId
					}
				})
				.success(function (data, status){
					
					vm.allData = data;
					console.log(vm.allData);

					vm.accessedTime = vm.allData.time;

					//current bus stop
					vm.busStop = stopId;

					//list of buses for a stop
					vm.buses = vm.allData.departures;
				});

			// console.log(vm.allData);

			


		};

		

	}]);
