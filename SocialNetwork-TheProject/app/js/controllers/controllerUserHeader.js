'use strict';

appSocialNetwork.controller('controllerUserHeader',
    ['$scope', '$timeout', '$location', '$route', 'userData', 'authenticationData', 'notificationService',
        function ($scope, $timeout, $location, $route, userData, authenticationData, notificationService) {

            $scope.isActive = function (locationHTML) {
                return locationHTML === $location.path();
            };

            $scope.user = authenticationData.getCurrentUser();
            $scope.logout = logout;

            function logout() {
                userData.logoutCurrentUser()
                    .$promise
                    .then(function (data) {
                        authenticationData.clearStorages();
                        notificationService.success('Logout successful!');
                        redirectToHome(2000);
                    }, function (error) {
                        notificationService.error('Logout error!');
                        redirectToHome(2000);
                    })
            }

            function redirectToHome(time) {
                $timeout(function () {
                    $location.path('/');
                    $route.reload();
                }, time);
            }
}]);
