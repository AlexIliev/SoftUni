'use strict';

appSocialNetwork.controller('controllerFriendsBar',
    ['$scope', '$routeParams', 'authenticationData', 'friendsData', 'notificationService',
        function ($scope, $routeParams, authenticationData, friendsData, notificationService) {

        $scope.user = authenticationData.getLoggedUser();

        if(!$routeParams.username || $routeParams.username === $scope.user.username) {
            $scope.username = $scope.user.username;
            friendsData.getLoggedUserFriendsPreview()
                .$promise
                .then(function (data) {
                    $scope.totalCount = data.totalCount;
                    $scope.friends = data.friends;
                }, function (error) {
                    notificationService.error('Error!', error.data.message);
                });
        } else {
            $scope.username = $routeParams.username;
            friendsData.getOtherUserFriendsPreview($routeParams.username)
                .$promise
                .then(function (data) {
                    $scope.totalCount = data.totalCount;
                    $scope.friends = data.friends;
                }, function (error) {
                    notificationService.error('Error!', error.data.message);
                });
        }
    }]);