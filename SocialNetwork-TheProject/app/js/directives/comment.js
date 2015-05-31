'use strict';

appSocialNetwork.directive('comment', function () {
    return {
        templateUrl: 'templatesHTML/directives/comment.html',
        restrict: 'A',
        controller: 'controllerComment'
    }
});

