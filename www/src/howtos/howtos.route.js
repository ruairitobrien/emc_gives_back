(function () {
    'use strict';

    angular.module('givesBack.howtos')
        .config(function ($stateProvider) {
            $stateProvider
                .state('howto', {
                    url: '/howtos/:howtoId',
                    templateUrl: 'howtos/templates/howto.html',
                    controller: 'HowToCtrl as howToCtrl'
                })
                .state('task', {
                    url: '/howtos/:hottoId/tasks/:taskIndex',
                    templateUrl: 'howtos/templates/task.html',
                    controller: 'TaskCtrl as taskCtrl'
                });
        });
})();