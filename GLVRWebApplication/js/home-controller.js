angular.module('glvrApp').controller('homeController', ['$scope', '$location', 'SchemaService', function ($scope, $location, SchemaService) {
	$scope.submitted = false;
	$scope.inValidUser = false;
	$scope.adminError = false;
	$scope.loginUser = function (form) {
		$scope.submitted = true;
		if (!form.$valid) {
			return false;
		}

		var user = {};
		user.username = $scope.username;
		user.password = $scope.password;
		SchemaService.authenticateUser(user, function (data) {
			if (data == false) {
				$scope.inValidUser = true;
			}
			else if (data == true) {
				$location.path('/landing');
			}
			else {
				$scope.adminError = true;
				return false;
			}
		})
	}

}]);


