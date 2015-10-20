'Use Strict';
angular.module('App').controller('profileController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, Camera, FURL, Utils) {
    
  var ref = new Firebase(FURL + '/profile/' + $localStorage.userkey);

  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
      $scope.company = snapshot.val().company;
      $scope.email = snapshot.val().email;
      $scope.fullname = snapshot.val().fullname;
      $scope.registered = snapshot.val().registered_in;
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  
  $scope.logOut = function () {
      Auth.logout();
      $location.path("/login");
  };

  $scope.update = function(name, comp, mail){
      ref.update({
        fullname: name,
        company: comp,
        email: mail,
      });
  }

    
  
});
