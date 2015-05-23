'use strict';

socialNetworkBaseApp.controller('controllerLogin',
    ['$scope', '$route', '$timeout', 'userData','authenticationData',
        function ($scope, $route, $timeout, userData, authenticationData) {
        $scope.rememberMe = false;
        $scope.login = login;

        function login(user, loginForm) {
            userData.login(user)
                .$promise
                .then(function (data) {
                    $scope.user = {};
                    if ($scope.rememberMe) {
                        $scope.$storage = authenticationData.saveInLocalStorage(data.access_token, data.token_type);
                    } else {
                        $scope.$storage = authenticationData.saveInSessionStorage(data.access_token, data.token_type);
                    }
                    $scope.loginForm.$setPristine();
                }, function (error) {
                });
        }

        function reloadRoute(time) {
            $timeout(function () {
                $route.reload();
            }, time);
        }
    }
    ]);