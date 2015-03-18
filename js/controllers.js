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
    },
    
    // Some metadata to send through the webhook for your own
    // linking of device token and user
    {
      "user_id": 0,
      "email": "tester@example.com"
    }).then(function(deviceToken) {
      $scope.token = deviceToken;
    });
  }
  $scope.identifyUser = function() {
    alert('Identifying');
    console.log('Identifying user');
    $ionicUser.identify({
      user_id: '0',
      name: 'Test User',
      message: 'I come from planet Ion'
    });
  }
})

