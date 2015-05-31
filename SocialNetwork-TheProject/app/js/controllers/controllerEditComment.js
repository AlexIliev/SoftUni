'use strict';

appSocialNetwork.controller('controllerEditComment',
    ['$scope', 'commentData', 'notificationService', function ($scope, commentData, notificationService) {
        $scope.editCommentFormShown = false;
        $scope.editCommentFormCommentId = null;
        $scope.showEditCommentForm = showEditCommentForm;
        $scope.closeEditCommentForm = closeEditCommentForm;
        $scope.editComment = editComment;

        function showEditCommentForm(commentId) {
            $scope.editCommentFormShown = true;
            $scope.editCommentFormCommentId = commentId;
        }

        function closeEditCommentForm(){
            $scope.editCommentFormShown = false;
            $scope.editCommentFormCommentId = null;
        }

        function editComment(postId, commentId, commentContent) {
            $scope.posts.forEach(function (post) {
                if(post.id == postId) {
                    post.comments.forEach(function (comment) {
                        if(comment.id == commentId && $scope.user.username == comment.author.username) {
                            commentData.editComment(commentContent, postId, commentId)
                                .$promise
                                .then(function (data) {
                                    $scope.editCommentFormShown = false;
                                    $scope.editCommentFormCommentId = null;
                                    comment.commentContent = data.commentContent;
                                    notificationService.success('Comment edited successfully!');
                                }, function (error) {
                                    notificationService.error('Error!', error.data.message);
                                });
                        }
                    })
                }
            });
        }
    }]);
