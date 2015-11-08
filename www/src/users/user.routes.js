(function () {
    'use strict';

    angular.module('givesBack.users')
        .config(function ($stateProvider) {
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'users/templates/login.html',
                    controller: 'LoginCtrl as loginCtrl'
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'users/templates/signup.html',
                    controller: 'SignupCtrl as SignupCtrl'
                });
        });
})();