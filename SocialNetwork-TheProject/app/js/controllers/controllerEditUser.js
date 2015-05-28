'use strict';

appSocialNetwork.controller('controllerEditUser',
    ['$scope', '$location', '$route', 'userData', 'authenticationData', 'notificationService',
        function ($scope, $location, $route, userData, authenticationData, notificationService) {
            $scope.currentUser = authenticationData.getCurrentUser();
            $scope.editUser = editUser;

            function editUser (editUserData) {
                userData.editCurrentUser()
                    .$promise
                    .then(function (editedUserData){
                        userData.getCurrentUserData()
                            .$promise
                            .then(function (currentUserData) {
                                authenticationData.saveCurrentUser(currentUserData);
                                $location.path('/');
                                $route.reload();
                            }, function (error) {
                                notificationService.success('Edit User Error!');
                                authenticationData.deleteCredentials();
                                $route.reload();
                            });
                    },
                    function (error) {
                        notificationService.error('Edit User Error!');
                    });
            }
        }]);