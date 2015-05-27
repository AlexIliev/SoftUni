'use strict';

appSocialNetwork.service('authenticationData', ['$sessionStorage', '$localStorage',
    function ($sessionStorage, $localStorage) {

        function saveTokenInLocalStorage(sessionToken, tokenType){
            $localStorage.$default({
                'authorization': tokenType + ' ' + sessionToken
            });
        }

        function saveTokenInSessionStorage(sessionToken, tokenType) {
            $sessionStorage.$default({
                'authorization': tokenType + ' ' + sessionToken
            });
        }

        function checkIsUserLogged() {
            return ($sessionStorage.authorization || $localStorage.authorization);
        }

        function getAuthorization(){
            if ($sessionStorage.authorization) {
                return $sessionStorage.authorization;
            } else if ($localStorage.authorization) {
                return $localStorage.authorization;
            }
        }


        function saveCurrentUser(user) {
            $localStorage.$default({
                'currentUser': user
            });
        }

        function getCurrentUser(user) {
            return $localStorage.currentUser;
        }

        function clearStorages() {
            $localStorage.$reset();
            $sessionStorage.$reset();
        }

        return {
            saveTokenInLocalStorage: saveTokenInLocalStorage,
            saveTokenInSessionStorage: saveTokenInSessionStorage,
            checkIsUserLogged: checkIsUserLogged,
            getAuthorization: getAuthorization,
            saveCurrentUser: saveCurrentUser,
            getCurrentUser: getCurrentUser,
            clearStorages: clearStorages
        }
}]);
