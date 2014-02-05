$(function(){
	var myApp = angular.module('myApp', ['ngRoute', 'ngResource']); //[if you have supporting modules dependencies add it inside the square brackets] 
	
	myApp.config(['$routeProvider',function($routeProvider){
		$routeProvider
			.when('/',
			{	
				templateUrl: 'partials/tt.html',
				controller: 'vTrendingTopics'
			})
			.otherwise({redirectTo: '/'});
	}]);

	myApp.controller('vTrendingTopics', ['$scope', '$http', '$resource', function($scope, $http, $resource){
		$scope.tt = ttfactory.gettrjson;
		$http.get('data/tt.json')
			.success(function(data) {
	 			$scope.tt = data.trending.split(",");
	 		})
	 		.error(function(data) {
	 			console.log("Not found");
		});

	 	$scope.trendingFilter = $resource('http:search.twitter.com/:action', 
	 		{action:'search.json' q:"analytics", count:20, callback:"JSON_CALLBACK"},
	 		{get:{method:'JSONP'}
	 	});

	 	$scope.trendingFilterResults = $scope.trendingFilter.get();
	}]);	
})();