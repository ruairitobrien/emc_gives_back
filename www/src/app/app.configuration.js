(function () {
    'use strict';

    angular.module('givesBack')
        .constant('BACKEND', {
            url: 'http://localhost:3000'
        })
        .value('dpdConfig', {
            collections: ['categories', 'howtos'],
            serverRoot: 'http://localhost:3000', // optional, defaults to same server
            socketOptions: {reconnectionDelayMax: 3000}, // optional socket io additional configuration
            useSocketIo: false, // optional, defaults to false
            noCache: true // optional, defaults to false (false means that caching is enabled, true means it disabled)
        })
        .config(function ($urlRouterProvider) {
            // if no states are matched when app loads, go to the dashboard
            $urlRouterProvider.otherwise('/dashboard');

        });
})();