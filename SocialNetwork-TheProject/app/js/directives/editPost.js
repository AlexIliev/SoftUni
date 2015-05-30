'use strict';

appSocialNetwork.directive('editPost', function () {
    return {
        templateUrl: 'templatesHTML/directives/edit-post.html',
        restrict: 'A',
        controller: 'controllerEditPost'
    }
});
