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
            .when('/user/editprofile', {
                templateUrl: 'templatesHTML/user/editUser.html',
                controller: 'controllerEditUser'
                //resolve:{
                //    isLogged: function($location, $sessionStorage, $localStorage){
                //        if(!$sessionStorage.authorization && !$localStorage.authorization){
                //            $location.path('/');
                //        }
                //    }
                //}
            })
            .when('/user/editpassword', {
                templateUrl: 'templatesHTML/user/editPassword.html',
                controller: 'controllerEditPassword'
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