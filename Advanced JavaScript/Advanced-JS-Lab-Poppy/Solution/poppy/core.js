var poppy = poppy || {};

(function (scope){
    'use strict'

    var OPACITY_STEP = 0.04,
        FADE_IN_INTERVAL = 20,
        FADE_OUT_INTERVAL = 40;

    function pop(type, title, message, callback) {
        var popup;
        switch (type) {
            case 'success':
                popup = new scope._data.Success(title, message);
                break;
            case 'info':
                popup = new scope._data.Info(title, message);
                break;
            case 'error':
                popup = new scope._data.Error(title, message);
                break;
            case 'warning':
                popup = new scope._data.Warning(title, message, callback);
                break;
        }

        // generate view from view factory
        var view = scope._viewFactory.viewFactory(popup._popupData);

        processView(view, popup._popupData);
    }

    function processView(element, popupData) {
        if (popupData.autoHide === true) {
            setTimeout(function() {
                fadeOut(element, FADE_OUT_INTERVAL);
            }, popupData.timeout);
        }

        if (popupData.closeButton === true) {
            element.getElementsByClassName('poppy-close-button')[0]
                .addEventListener('click', function() {
                    fadeOut(element, FADE_OUT_INTERVAL);
                });
        }

        if (popupData.callback) {
            element.addEventListener('click', function() {
                popupData.callback();
            });
        }

        element.style.opacity = 0;
        document.body.appendChild(element);
        fadeIn(element, FADE_IN_INTERVAL);
    }

    function fadeOut(element, interval) {
        var opacity = 1,
            disappearInterval = setInterval(function() {
                if (opacity <= 0) {
                    document.body.removeChild(element);
                    clearInterval(disappearInterval);
                }

                element.style.opacity = opacity;
                opacity -= OPACITY_STEP;
            }, interval);
    }


    function fadeIn(element, interval) {
        var opacity = 0,
            disappearInterval = setInterval(function() {
                if (opacity >= 1) {
                    clearInterval(disappearInterval);
                }

                element.style.opacity = opacity;
                opacity += OPACITY_STEP;
            }, interval);
    }

    scope.pop = pop;
}(poppy));

