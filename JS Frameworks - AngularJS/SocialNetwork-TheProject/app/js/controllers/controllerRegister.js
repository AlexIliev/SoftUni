'use strict';

socialNetworkApp.controller('controllerRegister',
    ['$scope', '$route', '$timeout', 'userData', function ($scope, $route, $timeout, userData) {
        $scope.register = register;

        function register(user, registerForm) {
            userData.register(user)
                .$promise
                .then(function (data) {
                    $scope.user = {};
                    credentials.saveInSessionStorage(data.access_token, data.token_type);
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