'use strict';

appSocialNetwork.controller('controllerHome',
    ['$scope', '$location', '$route', '$routeParams', 'userData', 'postData', 'friendsData', 'authenticationData', 'notificationService',
        function ($scope, $location, $route, $routeParams, userData, postData, friendsData, authenticationData, notificationService) {


            var defaultStartPostId = 0,
                defaultPageSize = 10;

            $scope.isLogged = authenticationData.checkIsUserLogged();
            $scope.user = authenticationData.getCurrentUser();
            $scope.wallOwnerUsername = $routeParams.username;

            $scope.submitPost = submitPost;
            //$scope.deletePost = deletePost;
            //$scope.unlikePost = unlikePost;
            //$scope.likePost = likePost;

            getPosts();

            if($routeParams.username) {
                userData.getUserFullData($routeParams.username)
                    .$promise
                    .then(function (data) {
                        $scope.userData = data;
                        if($scope.user.username === $routeParams.username || $scope.userData.isFriend === true) {
                            $scope.isFriendOrLoggedUser = true;
                            $scope.wallOwner = $scope.userData.username;
                        }

                        if($scope.userData.isFriend) {
                            $scope.buttonName = 'Friend';
                            $scope.disabledButton = 'disabled';
                        } else if (
                            !$scope.userData.isFriend
                            && $scope.userData.hasPendingRequest
                            && $scope.user.username !== $routeParams.username) {
                            $scope.buttonName = 'Pending request';
                            $scope.disabledButton = 'disabled';
                        } else if(
                            !$scope.userData.isFriend
                            && !$scope.userData.hasPendingReques
                            && $scope.user.username !== $routeParams.username) {
                            $scope.buttonName = 'Invite';
                        } else {
                            $scope.buttonName = 'My wall';
                            $scope.disabledButton = 'disabled';
                        }
                    });
            }

            function submitPost(postContent) {
                var post = {
                    postContent: postContent,
                    username: $scope.wallOwnerUsername
                };
                postData.addPost(post)
                    .$promise
                    .then(function (postData) {
                        if(postData.length) {
                            $scope.posts.unshift(postData);
                        } else {
                            $scope.posts = [];
                        }
                    }, function (error) {
                        notificationService.error('Submit post is unsuccessful');
                    });
            }

            function getPosts() {
                if(!$routeParams.username) {
                    postData.getNewsFeed(defaultStartPostId, defaultPageSize)
                        .$promise
                        .then(function (data) {
                            $scope.posts = data;
                        }, function (error) {
                            notificationService.error('Get post is unsuccessful');
                        });
                } else {
                    postData.getUserWall($routeParams.username, defaultStartPostId, defaultPageSize)
                        .$promise
                        .then(function (data) {
                            $scope.posts = data;
                        }, function (error) {
                            notificationService.error('Get post is unsuccessful');
                        });
                }
            }

        }]);
