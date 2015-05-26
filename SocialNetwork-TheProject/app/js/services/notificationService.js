appSocialNetwork.factory('notificationService', [function () {
    var notyData = {
        layout: 'topCenter'
    };

    function success(message) {
        notyData.type = 'success';
        notyData.text = message;
        notyData.timeout = 2000;
        noty(notyData);
    }

    function error(message) {
        notyData.type = 'error';
        notyData.text = message;
        notyData.timeout = 5000;
        noty(notyData);
    }

    function warning(message) {
        notyData.type = 'warning';
        notyData.text = message;
        notyData.timeout = 2000;
        noty(notyData);
    }

    return {
        success: success,
        error: error,
        warning: warning
    }

}]);