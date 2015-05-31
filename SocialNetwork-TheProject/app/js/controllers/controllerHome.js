'use strict';

appSocialNetwork.controller('controllerHome',
    ['$scope', '$location', '$route', '$routeParams', 'userData', 'postData', 'friendsData', 'commentData', 'authenticationData', 'notificationService',
        function ($scope, $location, $route, $routeParams, userData, postData, friendsData, commentData, authenticationData, notificationService) {


            var defaultStartPostId = 0,
                defaultPageSize = 10;

            $scope.isLogged = authenticationData.checkIsUserLogged();
            $scope.user = authenticationData.getCurrentUser();
            $scope.wallOwnerUsername = $routeParams.username;


            $scope.submitPost = submitPost;
            $scope.deletePost = deletePost;
            $scope.unlikePost = unlikePost;
            $scope.likePost = likePost;

            $scope.sendFriendRequest = sendFriendRequest;
            $scope.showUserPreview = showUserPreview;

            $scope.unlikeComment = unlikeComment;
            $scope.likeComment = likeComment;
            $scope.deleteComment = deleteComment;

            if($scope.isLogged){
                getPosts();
            }

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
                            $route.reload();
                        } else {
                            $scope.posts = [];
                            $route.reload();
                        }
                    }, function (error) {
                        notificationService.error('Submit post is unsuccessful');
                        $route.reload();
                    });
            }

            function getPosts() {
                if(!$routeParams.username) {
                    $scope.isNewsFeed = true;
                    postData.getNewsFeed(defaultStartPostId, defaultPageSize)
                        .$promise
                        .then(function (data) {
                            $scope.posts = data;
                        }, function (error) {
                            notificationService.error('Get post is unsuccessful');
                        });
                } else {
                    $scope.isNewsFeed = false;
                    postData.getUserWall($routeParams.username, defaultStartPostId, defaultPageSize)
                        .$promise
                        .then(function (data) {
                            $scope.posts = data;
                        }, function (error) {
                            notificationService.error('Get post is unsuccessful');
                        });
                }
            }

            function deletePost(postId) {
                $scope.posts.forEach(function (post, index, object) {
                    if(post.id == postId) {
                        postData.deletePost(postId)
                            .$promise
                            .then(function (data) {
                                notificationService.success('Delete post is successful');
                                object.splice(index, 1);
                            }, function (error) {
                                notificationService.error('Delete post is unsuccessful');
                            });
                    }
                })
            }

            function unlikePost(postId) {
                $scope.posts.forEach(function (post) {
                    if(post.id == postId) {
                        if(post.author.isFriend || post.wallOwner.isFriend || $scope.user.username == post.author.username) {
                            postData.unlikePost(postId)
                                .$promise
                                .then(function (data) {
                                    post.liked = false;
                                    post.likesCount--;
                                }, function (error) {
                                    notificationService.success('Unlike post is successful');
                                });
                        } else {
                            notificationService.error('Unlike post is unsuccessful');
                        }
                    }
                });
            }

            function likePost(postId) {
                $scope.posts.forEach(function (post) {
                    if(post.id == postId) {
                        if(post.author.isFriend || post.wallOwner.isFriend || $scope.user.username == post.author.username) {
                            postData.likePost(postId)
                                .$promise
                                .then(function (data) {
                                    post.liked = true;
                                    post.likesCount++;
                                }, function (error) {
                                    notificationService.success('Like post is successful');
                                });
                        } else {
                            notificationService.error('Like post is unsuccessful');
                        }
                    }
                });
            }

            function unlikeComment(postId, commentId) {
                $scope.posts.forEach(function (post) {
                    if(post.id == postId) {
                        post.comments.forEach(function (comment) {
                            if(comment.id == commentId) {
                                if(post.author.isFriend || post.wallOwner.isFriend || $scope.user.username == post.author.username) {
                                    commentData.unlikeComment(postId, commentId)
                                        .$promise
                                        .then(function (data) {
                                            comment.liked = false;
                                            comment.likesCount--;
                                        }, function (error) {
                                            notificationService.error('You can`t unlike this comment!', error.data.message);
                                        });
                                } else {
                                    notificationService.error('You can`t unlike this comment!');
                                }
                            }
                        });
                    }
                });
            }

            function likeComment(postId, commentId) {
                $scope.posts.forEach(function (post) {
                    if(post.id == postId) {
                        post.comments.forEach(function (comment) {
                            if(comment.id == commentId) {
                                if(post.author.isFriend || post.wallOwner.isFriend || $scope.user.username == post.author.username) {
                                    commentData.likeComment(postId, commentId)
                                        .$promise
                                        .then(function (data) {
                                            comment.liked = true;
                                            comment.likesCount++;
                                        }, function (error) {
                                            notificationService.error('You can`t like this comment!', error.data.message);
                                        });
                                } else {
                                    notificationService.error('You can`t like this comment!');
                                }
                            }
                        });
                    }
                });
            }

            function deleteComment(postId, commentId) {
                $scope.posts.forEach(function (post) {
                    if(post.id == postId) {
                        post.comments.forEach(function (comment, index, object) {
                            if(comment.id == commentId) {
                                if ($scope.user.username == comment.author.username || $scope.user.username == post.author.username) {
                                    commentData.deleteComment(postId, commentId)
                                        .$promise
                                        .then(function (data) {
                                            post.totalCommentsCount--;
                                            notificationService.success('Comment deleted successfully.');
                                            object.splice(index, 1);
                                        }, function (error) {
                                            notificationService.error('Error!', error.data.message);
                                        });
                                }
                            }
                        });
                    }
                })
            }

            function sendFriendRequest(username) {
                friendsData.sendFriendRequest(username)
                    .$promise
                    .then(function (data) {
                        $scope.userData.hasPendingRequest = true;
                        $scope.buttonName = 'Pending request';
                        $scope.disabledButton = 'disabled';
                        notificationService.success('Sending friend request is successful');
                    }, function (error) {
                        notificationService.error('Sending friend request is unsuccessful');
                    });
            }

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
                        notificationService.error('User preview is unsuccessful');
                    });

                return true;
            }

        }]);
