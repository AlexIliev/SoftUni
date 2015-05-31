'use strict';

appSocialNetwork.directive('editComment', function () {
    return {
        templateUrl: 'templatesHTML/directives/edit-comment.html',
        restrict: 'A',
        controller: 'controllerEditComment'
    }
});

