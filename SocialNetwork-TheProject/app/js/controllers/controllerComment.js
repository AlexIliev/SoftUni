'use strict';

appSocialNetwork.controller('controllerComment',
    ['$scope', 'commentData', 'notificationService', function ($scope, commentData, notificationService) {
        $scope.showNewCommentForm = false;
        $scope.newCommentFormPostId = null;
        $scope.toggleNewCommentForm = toggleNewCommentForm;
        $scope.postComment = postComment;

        function toggleNewCommentForm(postId) {
            if($scope.showNewCommentForm) {
                $scope.showNewCommentForm = false;
                $scope.commentButtonName = 'Comment';
                $scope.commentContent = '';
            } else {
                $scope.showNewCommentForm = true;
                $scope.newCommentFormPostId = postId;
                $scope.commentButtonName = 'Hide';
            }
        }

        function postComment(commentContent, postId) {
            $scope.posts.forEach(function (post) {
                if(post.id == postId) {
                    if(post.author.isFriend || post.wallOwner.isFriend || $scope.user.username == post.author.username) {
                        commentData.addComment(commentContent, postId)
                            .$promise
                            .then(function (data) {
                                $scope.showNewCommentForm = false;
                                $scope.newCommentFormPostId = null;
                                post.comments.unshift(data);
                                post.totalCommentsCount++;
                                notificationService.success('Comment successfully added.');
                            }, function (error) {
                                notificationService.error('Error!', error.data.message);
                            });
                    } else {
                        notificationService.error('The user is not your friend or this is not your wall');
                    }
                }
            });
        }
    }]);