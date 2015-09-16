(function () {
    'use strict';

    angular.module('givesBack')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = ['$scope', '$location', '$rootScope', 'settings'];

    /* @ngInject */
    function AppCtrl($scope, $location, $rootScope, settings) {
        $scope.colour = settings.colour;
        $scope.$watch(function () {
            return settings.colour;
        }, function () {
            $scope.colour = settings.colour;
        });

        $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
            if (settings.locked) {
                event.preventDefault();
                $location.path(oldUrl);
            }
        });
    }
})();