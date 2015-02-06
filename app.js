//CUMTD api key
var apiKey = '3faf9283b96b4ea1bb5ec0c049c45f0c';

var version = 'v2.2';
var format = 'json';

//CUMTD url
var url = 'https://developer.cumtd.com/api/' + version + '/' + format + '/';
// search url
// var searchUrl = 'http://www.cumtd.com/autocomplete/Stops/' + version + '/' + format + '/search';



console.log('test');

// name our angular app
angular.module('cumtdApp', [])

	.controller('mainController', [ '$http', '$scope', function ($http, $scope) {
		
		//bind this to vm (view-model)
		var vm = this;

		//define variables and objects on this
		//this lets them be available to our views

		vm.message = 'Testing CUMTD API';

		vm.searchQuery = '';

		//bus stop id and name
		vm.stopId = '';
		vm.stopName = '';

		vm.departureData = {};
		vm.stopData = {};

		// performs bus stop search
		$scope.go = function() {
			console.log('its going');

			$http
				.get(url + 'GetStopsBySearch', {
					params: {
						key: apiKey,
						query: vm.searchQuery
					}
				})
				.success(function(data){
					vm.stopData = data;
					console.log(vm.stopData.stops[0]);
					vm.stopId = vm.stopData.stops[0].stop_id;
					vm.stopName = vm.stopData.stops[0].stop_name;
					vm.searchQuery = '';
					$scope.load();
				});				
		};

		// loads departure data for a specific stop
		$scope.load = function() {
			console.log('load button clicked');
			
			$http
				.get(url + 'GetDeparturesByStop', {
					params: {
						key: apiKey,
						stop_id: vm.stopId
					}
				})
				.success(function (data, status){
					
					vm.departureData = data;
					console.log(vm.departureData);

					vm.accessedTime = vm.departureData.time;

					//current bus stop
					vm.busStop = vm.stopName;

					//list of buses for a stop
					vm.buses = vm.departureData.departures;
				});

		};

		

	}]);
