'use strict';

var appSocialNetwork = angular
    .module('appSocialNetwork', ['ngResource', 'ngRoute', 'ngStorage'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templatesHTML/home.html',
                controller: 'controllerHome'
            })
            .when('/user/login', {
                templateUrl: 'templatesHTML/guest/login.html',
                controller: 'controllerLogin'
                //resolve:{
                //    isLogged: function($location, $sessionStorage, $localStorage){
                //        if(!$sessionStorage.authorization && !$localStorage.authorization){
                //            $location.path('/');
                //        }
                //    }
                //}
            })
            .when('/user/register', {
                templateUrl: 'templatesHTML/guest/register.html',
                controller: 'controllerRegister'
                //resolve:{
                //    isLogged: function($location, $sessionStorage, $localStorage){
                //        if(!$sessionStorage.authorization && !$localStorage.authorization){
                //            $location.path('/');
                //        }
                //    }
                //}
            })
            .when('/user/wall', {
                templateUrl: 'templatesHTML/user/homeUser.html',
                controller: 'controllerUserWall'
                //resolve:{
                //    isLogged: function($location, $sessionStorage, $localStorage){
                //        if(!$sessionStorage.authorization && !$localStorage.authorization){
                //            $location.path('/');
                //        }
                //    }
                //}
            })
            .otherwise({
                redirectTo: '/'
            })
    })
    .constant('baseUrl', 'http://softuni-social-network.azurewebsites.net/api/');