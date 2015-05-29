'use strict';

appSocialNetwork.controller('controllerUserHeader',
    ['$scope', '$timeout', '$location', '$route', 'userData', 'authenticationData', 'notificationService',
        function ($scope, $timeout, $location, $route, userData, authenticationData, notificationService) {

            $scope.isActive = function (locationHTML) {
                return locationHTML === $location.path();
            };

            $scope.user = authenticationData.getCurrentUser();
            $scope.logout = logout;
            $scope.searchUsers = searchUsers;
            $scope.searchResultsShown = false;

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

            function searchUsers(searchInput) {
                userData.searchUsersByName(searchInput)
                    .$promise
                    .then(function (data) {
                        if(data.length) {
                            $scope.searchedResults = data;
                            $scope.searchedResultsLength = data.length;
                            $scope.searchResultsShown = true;
                        } else {
                            $scope.searchResults = [];
                            $scope.searchResultsShown = false;
                        }
                    }, function (error) {
                        $scope.searchResultsShown = false;
                    });
            }

            function redirectToHome(time) {
                $timeout(function () {
                    $location.path('/');
                    $route.reload();
                }, time);
            }
}]);
