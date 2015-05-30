'use strict';

appSocialNetwork.directive('post', function () {
    return {
        templateUrl: 'templatesHTML/directives/post.html',
        restrict: 'A',
        controller: 'controllerHome'
    }
});
