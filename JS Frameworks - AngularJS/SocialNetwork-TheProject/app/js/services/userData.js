'use strict';

socialNetworkBaseApp.factory('userData', ['$resource', 'baseUrl','authenticationData',
    function ($resource, baseUrl, authenticationData) {
    function loginUser(user) {
        return $resource(baseUrl + 'users/Login')
            .save(user);
    }

    function registerUser(user) {
        return $resource(baseUrl + 'users/Register')
            .save(user);
    }

    function logoutUser() {
        return $resource(
            baseUrl + 'users/Logout')
            .save();
    }

    return {
        login: loginUser,
        register: registerUser,
        logout: logoutUser
    }
}]);