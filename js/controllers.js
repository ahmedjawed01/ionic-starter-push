/**
 * Created by fuiste on 3/3/15.
 */

angular.module('starter.controllers', [])

    .controller('AppCtrl', function($scope, $rootScope, $ionicPush) {
        //Dummy metadata, you're going to want to change this..
        $rootScope.metadata = {user_id: 1};

        //Basic registration
        $scope.pushRegister = function() {
            $ionicPush.register($rootScope.metadata);
        }
    })
