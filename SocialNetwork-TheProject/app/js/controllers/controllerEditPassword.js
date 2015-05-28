'use strict';

appSocialNetwork.controller('controllerEditPassword',
    ['$scope', '$location', '$route', 'userData', 'authenticationData', 'notificationService',
        function ($scope, $location, $route, userData, authenticationData, notificationService) {
            $scope.editPassword = editPassword;

            function editPassword (userPasswoords) {
                userData.changeUserPassword(userPasswoords)
                    .$promise
                    .then(function (dataResponse){
                        notificationService.success('Edit Password Successful!');
                        $location.path('/');
                        $route.reload();
                    },
                    function (error) {
                        notificationService.error('Edit Password Error!' + dataResponse.error.message);
                        $location.path('/');
                        $route.reload();
                    });
            }
        }]);