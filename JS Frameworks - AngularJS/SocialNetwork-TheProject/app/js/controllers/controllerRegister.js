'use strict';

socialNetworkBaseApp.controller('controllerRegister',
    ['$scope', '$route', '$timeout', 'userData', 'authenticationData', function ($scope, $route, $timeout, userData) {
        $scope.register = register;

        function register(user, registerForm) {
            userData.register(user)
                .$promise
                .then(function (data) {
                    $scope.user = {};
                    authenticationData.saveInSessionStorage(data.access_token, data.token_type);
                    $scope.registerForm.$setPristine();
                }, function (error) {
                })
        }

        function reloadRoute(time) {
            $timeout(function () {
                $route.reload();
            }, time);
        }
    }
    ]);