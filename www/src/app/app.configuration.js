(function () {
    'use strict';

    angular.module('givesBack')
        .value('dpdConfig', {
            collections: ['users', 'categories', 'howtos', 'fileupload'],
            serverRoot: 'http://104.155.78.54', //'http://localhost:3000', // optional, defaults to same server
            socketOptions: {reconnectionDelayMax: 3000}, // optional socket io additional configuration
            useSocketIo: false, // optional, defaults to false
            noCache: true // optional, defaults to false (false means that caching is enabled, true means it disabled)
        })
        .config(function ($urlRouterProvider) {
            // if no states are matched when app loads, go to the dashboard
            $urlRouterProvider.otherwise('/dashboard');

        });
})();