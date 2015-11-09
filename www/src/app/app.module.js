angular.module('givesBack', [
        'ionic',
        'givesBack.categories',
        'givesBack.dashboard',
        'givesBack.howtos',
        'givesBack.settings',
        'givesBack.tasks',
        'givesBack.users',
        'dpd',
        'ngCookies'

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
    .run(function ($rootScope, $state, $location, $log, $cookieStore, UserService) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            if (toState.name !== 'login' && toState.name !== 'signup') {
                var auth = $cookieStore.get('authdata');
                if (!auth || !UserService.user || UserService.user.id !== auth) {
                    UserService.getUser().then(function () {
                        $state.go(toState.name);
                    }, function (err) {
                        $log.error(err);
                        $state.go('login');
                    });
                    event.preventDefault();

                }
            }
        });
    });
