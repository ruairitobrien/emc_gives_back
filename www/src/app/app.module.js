var db = null;
angular.module('givesBack', [
    'ionic',
    'givesBack.categories',
    'givesBack.howtos',
    'givesBack.settings',
    'dpd'

])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }

        });
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
        serverRoot: 'http://mobility-dev.isus.emc.com:2403/', // optional, defaults to same server
        socketOptions: { reconnectionDelayMax: 3000 }, // optional socket io additional configuration
        useSocketIo: false, // optional, defaults to false
        noCache: true // optional, defaults to false (false means that caching is enabled, true means it disabled)
    });
