(function () {
    'use strict';

    angular.module('givesBack.howtos')
        .config(function ($stateProvider) {
            $stateProvider
                .state('howto', {
                    url: '/howtos/:howtoId',
                    templateUrl: 'howtos/templates/howto.html',
                    controller: 'HowToCtrl as howToCtrl'
                });
        });
})();