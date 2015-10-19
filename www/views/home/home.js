'Use Strict';
angular.module('App').controller('homeController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils) {
  	var ref = new Firebase(FURL);
  	


	var ref = new Firebase(FURL + '/profile/' + $localStorage.userkey);

	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value", function(snapshot) {
  		$scope.company = snapshot.val().company;
  		$scope.fullname = snapshot.val().fullname;
  		$scope.registered = snapshot.val().registered_in;
	}, function (errorObject) {
		console.log("The read failed: " + errorObject.code);
	});


  	$scope.logOut = function () {
      	Auth.logout();
      	$location.path("/login");
  	}

  	$scope.getPhoto = function() {
	    Camera.getPicture().then(function(imageURI) {
	      console.log(imageURI);
	      $scope.lastPhoto = imageURI;
	    }, function(err) {
	      console.err(err);
	    }, {
	      quality: 75,
	      targetWidth: 320,
	      targetHeight: 320,
	      saveToPhotoAlbum: false
	    });
	  };

}
);
