angular.module('ionic.service.push', ['ngCordova', 'ionic.service.core'])

/**
 * The Ionic Push service client wrapper.
 *
 * Example:
 *
 * angular.controller(['$scope', '$ionicPush', function($scope, $ionicPush) {
 * }])
 *
 */
    .factory('$ionicPush', [
        '$http', '$cordovaPush', '$ionicApp', '$log',

        function($http, $cordovaPush, $ionicApp, $log) {

            // Grab the current app
            var app = $ionicApp.getApp();

            //Check for required credentials
            if(!app || !app.app_id) {
                $log.error('PUSH: Unable to initialize, you must call $ionicAppProvider.identify() first');
            }

            function init(metadata, platform) {
                var gcmKey = $ionicApp.getGcmId();
                var config;
                var api = $ionicApp.getValue('push_api_server');

                if(platform === 'android') {
                    //Default configuration for Android
                    config = {
                        "senderID": gcmKey
                    };
                } else if (platform === 'ios') {
                    //Default configuration for iOS
                    config = {
                        "badge": true,
                        "sound": true,
                        "alert": true
                    };
                }

                $cordovaPush.register(config).then(function(token) {
                    if (platform === 'ios') {
                        $log.debug('Device token: ' + token);

                        // Success -- send deviceToken to server, and store
                        var req = {
                            method: 'POST',
                            url: api + "/api/v1/register-device-token",
                            headers: {
                                'X-Ionic-Application-Id': $ionicApp.getId(),
                                'X-Ionic-API-Key': $ionicApp.getApiKey()
                            },
                            data: {
                                ios_token: token,
                                metadata: metadata
                            }
                        };


                        $http(req)
                            .success(function (data, status) {
                                alert("Success: " + data);
                            })
                            .error(function (error, status, headers, config) {
                                alert("Error: " + error + " " + status + " " + headers);
                            });
                    }
                });
            }

            function androidInit(token, metadata) {
                $log.debug('Device token: ' + token);
                var api = $ionicApp.getValue('push_api_server');
                var req = {
                    method: 'POST',
                    url: api + "/api/v1/register-device-token",
                    headers: {
                        'X-Ionic-Application-Id': $ionicApp.getId(),
                        'X-Ionic-API-Key': $ionicApp.getApiKey()
                    },
                    data: {
                        android_token: token,
                        metadata: metadata
                    }
                };

                $http(req)
                    .success(function(data, status) {
                        alert("Success: " + data + " " + status);
                    })
                    .error(function(error, status, headers, config) {
                        alert("Error: " + error + " " + status);
                    });
            }

            return {
                register: function(metadata, platform){
                    app && init(metadata, platform);
                },
                callback: function(token, metadata){
                    app && androidInit(token, metadata);
                }
            }
        }]);