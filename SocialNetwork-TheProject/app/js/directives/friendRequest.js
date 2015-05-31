'use strict';

appSocialNetwork.directive('friendRequest', function () {
    return {
        templateUrl: 'templatesHTML/directives/friend-request.html',
        restrict: 'A',
        controller: 'controllerRequestFriends'
    }
});
