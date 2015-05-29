'use strict';

appSocialNetwork.factory('friendsData', ['$resource', 'baseUrl', 'authenticationData',
    function ($resource, baseUrl, authenticationData) {
    function getLoggedUserFriendsPreview() {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'me/friends/preview',
            null,
            {
                'get': {
                    method: 'GET',
                    headers: {'Authorization': authorization}
                }
            })
            .get();
    }

    function getLoggedUserFriends() {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'me/friends',
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

    function getOtherUserFriendsPreview(username) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'users/' + username + '/friends/preview',
            null,
            {
                'get': {
                    method: 'GET',
                    headers: {'Authorization': authorization}
                }
            })
            .get();
    }

    function getOtherUserFriends(username) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'users/' + username + '/friends',
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

    function getFriendRequests() {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'me/requests',
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

    function sendFriendRequest(name) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'me/requests/' + name,
            null,
            {
                'save': {
                    method: 'POST',
                    headers: {'Authorization': authorization}
                }
            })
            .save();
    }

    function approveFriendRequest(requestId) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'me/requests/' + requestId + '?status=approved',
            null,
            {
                'update': {
                    method: 'PUT',
                    headers: {'Authorization': authorization}
                }
            })
            .update();
    }

    function rejectFriendRequest(requestId) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'me/requests/' + requestId + '?status=rejected',
            null,
            {
                'update': {
                    method: 'PUT',
                    headers: {'Authorization': authorization}
                }
            })
            .update();
    }

    return {
        getLoggedUserFriendsPreview: getLoggedUserFriendsPreview,
        getLoggedUserFriends: getLoggedUserFriends,
        getOtherUserFriendsPreview: getOtherUserFriendsPreview,
        getOtherUserFriends: getOtherUserFriends,
        getFriendRequests: getFriendRequests,
        sendFriendRequest: sendFriendRequest,
        approveFriendRequest: approveFriendRequest,
        rejectFriendRequest: rejectFriendRequest
    }
}]);
