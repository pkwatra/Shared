angular.module('glvrApp').controller('landingController', ['$rootScope', '$scope', '$location', 'SchemaService', function ($rootScope, $scope, $location, SchemaService) {

	SchemaService.getUserName(function (res) {
		if (res) {
			$rootScope.isUserLoggedIn = true;			
		}
		else 
		{
			$location.path('/');
		}
	})

	SchemaService.showLandingImage(function (re){
		console.log("Showing landing page!");
	})

}]);



