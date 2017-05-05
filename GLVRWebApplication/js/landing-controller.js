angular.module('glvrApp').controller('landingController', ['$rootScope', '$scope', '$location', 'SchemaService', function ($rootScope, $scope, $location, SchemaService) {

	SchemaService.getUserName(function (res) {
		if (res) {
			$rootScope.isUserLoggedIn = true;			
		}
		else 
		{
			$location.path('/home');
		}

		BindDragEvents();
		CreateMesh(true);
		StopRotation(true);
	})

	$rootScope.showMenu = function() {
		 $(".main-menu-link").hide();
	     $('.main-nav').animate({"right": '0'});
	}


	$scope.hideMenu = function() {
		$('.main-nav').animate({"right": '-400px'}, function() {
			$(".main-menu-link").show();
		});
	}
}]);



