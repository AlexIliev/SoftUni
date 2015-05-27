'use strict';

appSocialNetwork.controller('controllerRegister',
    ['$scope', '$location', '$route', 'userData', 'authenticationData', 'notificationService',
        function ($scope, $location, $route, userData, authenticationData, notificationService) {
            $scope.registerUser = register;

            function register (userDataInput) {
                userData.registerRequest(userDataInput)
                    .$promise
                    .then(function (userDataResponse){
                        $scope.$storage = authenticationData.saveTokenInSessionStorage
                        (userDataResponse.access_token, userDataResponse.token_type);

                        userData.getCurrentUserData()
                            .$promise
                            .then(function (currentUserData) {
                                authenticationData.saveCurrentUser(currentUserData);
                                notificationService.success('Register successful!');
                                $location.path('/user/wall');
                                $route.reload();
                            }, function (error) {
                                notificationService.success('Register error!');
                                authenticationData.deleteCredentials();
                                $route.reload();
                            });
                    },
                    function (error) {
                        notificationService.error('Register Error!');
                    });
            }
        }]);