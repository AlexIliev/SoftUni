'use strict';

appSocialNetwork.controller('controllerNewsFeed',
    ['$scope', '$location', '$route', 'userData', 'authenticationData', 'notificationService',
        function ($scope, $location, $route, userData, authenticationData, notificationService) {

            function showUserPreview(username) {
                $scope.userFriendStatus = 'Getting status...';
                $scope.userHoverButtonType = 'disabled';

                userData.getUserPreviewData(username)
                    .$promise
                    .then(function (data) {
                        if(data.username == $scope.user.username) {
                            $scope.userFriendStatus = 'Me';
                            $scope.userHoverButtonType = 'disabled';
                        } else if(data.isFriend) {
                            $scope.userFriendStatus = 'Friend';
                            $scope.userHoverButtonType = 'disabled';
                        } else if(!data.isFriend && data.hasPendingRequest) {
                            $scope.userFriendStatus = 'Pending';
                            $scope.userHoverButtonType = 'disabled';
                        } else if(!data.isFriend && !data.hasPendingRequest) {
                            $scope.userFriendStatus = 'Invite';
                            $scope.userHoverButtonType = 'enabled';
                        }
                    }, function (error) {
                        toaster.pop('error', 'Error!', error.data.message);
                    });

                return true;
            }
        }]);

