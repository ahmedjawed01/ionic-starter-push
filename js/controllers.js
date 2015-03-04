/**
 * Created by fuiste on 3/3/15.
 */

angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $ionicPush) {
        //Dummy metadata, you're going to want to change this
        $scope.metadata = {user_id: 1};

        //Simple platform check
        $scope.curPlatform = function() {
            if (ionic.Platform.isAndroid()) {
                return 'android'
            } else if (ionic.Platform.isIOS()) {
                return 'ios'
            }
        }

        //Basic registration
        $scope.pushRegister = function() {
            //Dummy metadata
            $ionicPush.register($scope.metadata, $scope.curPlatform());
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