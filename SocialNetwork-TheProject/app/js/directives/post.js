'use strict';

socialNetworkApp.directive('post', function () {
    return {
        templateUrl: 'templatesHTML/directives/post.html',
        restrict: 'A',
        controller: 'controllerNewsFeed'
    }
});
