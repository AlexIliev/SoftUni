'use strict';

appSocialNetwork.controller('controllerHome',
    ['$scope', 'authenticationData',
        function ($scope, authenticationData) {

        $scope.isLogged = authenticationData.checkIsUserLogged();
    }]);