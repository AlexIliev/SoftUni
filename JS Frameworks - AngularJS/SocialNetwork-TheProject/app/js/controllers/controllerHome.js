'use strict';

socialNetworkBaseApp.controller('controllerHome',
    ['$scope','authenticationData', function($scope, authenticationData){
    $scope.isUserLogged = authenticationData.checkForSessionToken();
}])
