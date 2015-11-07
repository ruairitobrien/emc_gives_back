angular.module('givesBack').constant('BACKEND', {
        url: 'http://localhost:3000'
    })
    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // Each tab has its own nav history stack

            .state('dash', {
                url: '/dash',
                templateUrl: 'app/templates/dash.html',
                controller: 'DashboardCtrl as dashboardCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/dash');

    })

    .value('dpdConfig', {
        collections: ['categories', 'howtos'],
        serverRoot: 'http://localhost:3000', // optional, defaults to same server
        socketOptions: {reconnectionDelayMax: 3000}, // optional socket io additional configuration
        useSocketIo: false, // optional, defaults to false
        noCache: true // optional, defaults to false (false means that caching is enabled, true means it disabled)
    });