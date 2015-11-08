(function () {
    'use strict';

    angular.module('givesBack.dashboard')
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'dashboard/templates/dashboard.html',
                    controller: 'DashboardCtrl as dashboardCtrl'
                    /**resolve: {
                        user: UserService.resolveUserOrRedirect()
                    }*/
                });

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/dashboard');

        });
})();