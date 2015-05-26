'use strict';

appSocialNetwork.factory('userData', ['$resource', 'baseUrl', 'authenticationData',
    function ($resource, baseUrl, authenticationData) {

    function loginUserRequest(userDataInput) {
        return $resource(baseUrl + 'users/login')
            .save(userDataInput);
    }

    function registerUserRequest(userDataInput) {
        return $resource(baseUrl + 'users/register')
            .save(userDataInput);
    }

    function getUserData() {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'me',
            null,
            {
                'get': {
                    method: 'GET',
                    headers: {'Authorization': authorization}
                }
            })
            .get();
    }

    return {
        loginRequest: loginUserRequest,
        registerRequest: registerUserRequest,
        getUserData: getUserData
    }
}]);