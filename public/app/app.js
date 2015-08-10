var app = angular.module('app', ['ngResource'])
	.controller('testCtrl', function($scope, $resource, jobs){
	$scope.jobs = $resource('/api/jobs').query();
	jobs.save({title: "test title", description: "test description"});
});