'use strict';

var socialNetworkBaseApp = angular
    .module('socialNetworkBaseApp', ['ngResource', 'ngRoute', 'ngStorage'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templatesHTML/home.html'
            })
            .when('/logout', {
                templateUrl: 'templatesHTML/user/logout.html',
                controller: 'controllerLogout'
            })
            .otherwise({
                redirectTo: '/'
            })
    })
    .value('user', {
        "username": '',
        "name": ''
    })
    .constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api/');