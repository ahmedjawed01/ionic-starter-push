/**
 * Created by fuiste on 3/3/15.
 */

angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicPush) {
        //Dummy metadata, you're going to want to change this
        $scope.metadata = {user_id: 1};

        //Basic registration
        $scope.pushRegister = function() {
            //Dummy metadata
            $ionicPush.register($scope.metadata);
        }

        //Notification Received
        $scope.$on('$cordovaPush:notificationReceived', function (event, notification) {
            if (ionic.Platform.isAndroid()) {
                if (notification.event == "registered") {
                    $ionicPush.callback(notification.regid, $scope.metadata);
                } else {
                    /**
                     * Handle your Android notification here
                     */
                }
            }
            else if (ionic.Platform.isIOS()) {
                /**
                 * Handle your iOS notification here
                 */
            }
        });
    })