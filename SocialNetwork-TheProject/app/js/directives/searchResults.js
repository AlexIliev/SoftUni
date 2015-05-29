'use strict';

appSocialNetwork.directive('searchResults', function () {
    return {
        templateUrl: 'templatesHTML/directives/search-results.html',
        restrict: 'A',
        controller: 'controllerUserHeader'
    }
});
