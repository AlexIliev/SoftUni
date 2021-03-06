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

    function getCurrentUserData() {
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

    function logoutCurrentUser(){
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'users/logout',
            null,
            {
                'save': {
                    method: 'POST',
                    headers: {'Authorization': authorization}
                }
            })
            .save();
    }

    function editCurrentUser(user) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'me',
            null,
            {
                'put': {
                    method: 'PUT',
                    headers: {'Authorization': authorization}
                }
            })
            .put(user);
    }

    function changeUserPassword(userPassword) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'me/changepassword',
            null,
            {
                'put': {
                    method: 'PUT',
                    headers: {'Authorization': authorization}
                }
            })
            .put(userPassword);
    }

    function searchUsersByName(searchedName) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'users/search?searchTerm=' + searchedName,
            null,
            {
                'get': {
                    method: 'GET',
                    isArray: true,
                    headers: {'Authorization': authorization}
                }
            })
            .get();
    }

    function getUserFullData(username) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'users/' + username,
            null,
            {
                'get': {
                    method: 'GET',
                    headers: {'Authorization': authorization}
                }
            })
            .get();
    }

    function getUserPreviewData(username) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'users/' + username + '/preview',
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
        getCurrentUserData: getCurrentUserData,
        editCurrentUser: editCurrentUser,
        logoutCurrentUser: logoutCurrentUser,
        changeUserPassword: changeUserPassword,
        searchUsersByName: searchUsersByName,
        getUserFullData: getUserFullData,
        getUserPreviewData: getUserPreviewData
    }
}]);