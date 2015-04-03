angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $ionicPush, $ionicUser) {
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    console.log('Got token', data.token, data.platform);
  });
  //Basic registration
  $scope.pushRegister = function() {
    alert('Registering...');

    $ionicPush.register({
      canShowAlert: false,
      onNotification: function(notification) {
        // Called for each notification for custom handling
        $scope.lastNotification = JSON.stringify(notification);
      }
    }).then(function(deviceToken) {
      $scope.token = deviceToken;
    });
  }
  $scope.identifyUser = function() {
    alert('Identifying');
    console.log('Identifying user');

    var existingUser = $ionicUser.get();
    if(!existingUser) {
      existingUser = {
        user_id: $ionicUser.generateGUID(), // Use the user_id from your database if you have it
        name: 'Test User',
        message: 'I come from planet Ion'
      }
    } else {
      // Update if we have new fields or anything,
      // but don't generate 
      // existingUser.amount_purchased = 100
    }

    $ionicUser.identify(existingUser);
    
  }
})

