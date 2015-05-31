'use strict';

appSocialNetwork.controller('controllerRequestFriends',
    ['$scope', '$route', 'friendsData', 'notificationService',
        function ($scope, $route, friendsData, notificationService) {

        $scope.acceptRequest = acceptRequest;
        $scope.rejectRequest = rejectRequest;
        $scope.cancel = cancel;

        function cancel(requestId) {
            $scope.requestDetailsShown = false;
        }

        function acceptRequest(requestId) {
            friendsData.approveFriendRequest(requestId)
                .$promise
                .then(function (data) {
                    notificationService.success('Success!', data.message);
                    friendsData.getFriendRequests()
                        .$promise
                        .then(function (data) {
                            $scope.requestsCount = data.length;
                            $scope.requests = data;
                            if($scope.requestsCount === 0) {
                                $scope.requestDetailsShown = false;
                            }
                        });
                }, function (error) {
                    notificationService.error('Error!', error.data.message);
                });
        }

        function rejectRequest(requestId) {
            friendsData.rejectFriendRequest(requestId)
                .$promise
                .then(function (data) {
                    notificationService.success('Success!', data.message);
                    friendsData.getFriendRequests()
                        .$promise
                        .then(function (data) {
                            $scope.requestsCount = data.length;
                            $scope.requests = data;
                            if($scope.requestsCount === 0) {
                                $scope.requestDetailsShown = false;
                            }
                        });
                }, function (error) {
                    notificationService.error('Error!', error.data.message);
                });
        }
    }]);
