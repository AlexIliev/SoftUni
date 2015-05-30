'use strict';

appSocialNetwork.controller('controllerEditPost',
    ['$scope', '$location', '$route', '$routeParams', 'userData', 'postData', 'friendsData', 'authenticationData', 'notificationService',
        function ($scope, $location, $route, $routeParams, userData, postData, friendsData, authenticationData, notificationService) {

            $scope.editPostFormShown = false;
            $scope.editPostFormPostId = null;
            $scope.showEditPostForm = showEditPostForm;
            $scope.closeEditPostForm = closeEditPostForm;
            $scope.editPost = editPost;

            function showEditPostForm(postId) {
                $scope.editPostFormShown = true;
                $scope.editPostFormPostId = postId;
            }

            function closeEditPostForm(){
                $scope.editPostFormShown = false;
                $scope.editPostFormPostId = null;
            }

            function editPost(postId, postContent) {
                $scope.posts.forEach(function (post) {
                    if(post.id == postId && $scope.user.username == post.author.username) {
                        postData.editPost(postId, postContent)
                            .$promise
                            .then(function (data) {
                                $scope.editPostFormShown = false;
                                $scope.editPostFormPostId = null;
                                post.postContent = data.content;
                                notificationService('Post edited successfully!');
                            }, function (error) {
                                notificationService.error('Error Edit Post!');
                            });
                    }
                });
            }
        }]);
