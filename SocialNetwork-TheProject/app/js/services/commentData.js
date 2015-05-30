'use strict';

appSocialNetwork.factory('commentData', ['$resource', 'baseUrl', 'authenticationData',
    function ($resource, baseUrl, authenticationData) {
    function addComment(commentContent, postId) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'posts/' + postId + '/comments',
            null,
            {
                'save': {
                    method: 'POST',
                    headers: {'Authorization': authorization}
                }
            })
            .save(commentContent);
    }

    function editComment(commentContent, postId, commentId) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'posts/' + postId + '/comments/' + commentId,
            null,
            {
                'update': {
                    method: 'PUT',
                    headers: {'Authorization': authorization}
                }
            })
            .update(commentContent);
    }

    function deleteComment(postId, commentId) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'posts/' + postId + '/comments/' + commentId,
            null,
            {
                'delete': {
                    method: 'DELETE',
                    headers: {'Authorization': authorization}
                }
            })
            .delete();
    }

    function likeComment(postId, commentId) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'posts/' + postId + '/comments/' + commentId + '/likes',
            null,
            {
                'save': {
                    method: 'POST',
                    headers: {'Authorization': authorization}
                }
            })
            .save();
    }

    function unlikeComment(postId, commentId) {
        var authorization = authenticationData.getAuthorization();
        return $resource(
            baseUrl + 'posts/' + postId + '/comments/' + commentId + '/likes',
            null,
            {
                'delete': {
                    method: 'DELETE',
                    headers: {'Authorization': authorization}
                }
            })
            .delete();
    }

    return {
        addComment: addComment,
        editComment: editComment,
        deleteComment: deleteComment,
        likeComment: likeComment,
        unlikeComment: unlikeComment
    }
}]);
