/*
 * Name: [Project name]
 * Version: 1.0
 * Owner: Corporate Webmaster (NUS_N_NIWWW)
 * Copyright (c) 2013 IBM Corporation
 */

// URI: [File location on live site]
// Description: [JS Customization for "Project name"]
// Author: [Name and Lotus Notes address of JS author]
// Date: [Date of file edits] (e.g. July 30, 2013)
//


$(document).ready(function(){
	console.log("ready");
	var ibmVoices = angular.module('ibmVoices', ['ngRoute']); //[if you have supporting modules dependencies add it inside the square brackets] 
		
		ibmVoices.config(['$routeProvider',function($routeProvider){
					$routeProvider
						.when('/',
						{
							templateUrl: 'partials/tt.html',
							controller: 'vTrendingTopics'
						})
						.otherwise({redirectTo: 'index-ng.html'});
				}]);
		
		
		ibmVoices.controller('vTrendingTopics', ['$scope', '$http', function($scope, $http){
			$http.get('tt.json').success(function(data) {
		      $scope.tt = data;
		    });

		}]);

});
