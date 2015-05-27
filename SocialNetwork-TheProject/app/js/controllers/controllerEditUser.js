'use strict';

appSocialNetwork.controller('controllerLogin',
    ['$scope', '$location', '$route', 'userData', 'authenticationData', 'notificationService',
        function ($scope, $location, $route, userData, authenticationData, notificationService) {


            $scope.rememberMe = false;
            $scope.loginUser = login;

            function login (userDataInput) {
                userData.loginRequest(userDataInput)
                    .$promise
                    .then(function (userDataResponse){
                        if($scope.rememberMe){
                            $scope.$storage = authenticationData.saveTokenInLocalStorage
                            (userDataResponse.access_token, userDataResponse.token_type);
                        } else {
                            $scope.$storage = authenticationData.saveTokenInSessionStorage
                            (userDataResponse.access_token, userDataResponse.token_type);
                        }
                        userData.getCurrentUserData()
                            .$promise
                            .then(function (currentUserData) {
                                authenticationData.saveCurrentUser(currentUserData);
                                notificationService.success('Login successful!');
                                $location.path('/');
                                $route.reload();
                            }, function (error) {
                                notificationService.success('Login error!');
                                authenticationData.deleteCredentials();
                                $route.reload();
                            });
                    },
                    function (error) {
                        notificationService.error('Login Error!');
                    });
            }
        }]);