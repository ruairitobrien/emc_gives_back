(function () {
    'use strict';

    angular
        .module('givesBack')
        .filter('trusted', ['$sce', function ($sce) {
            return function (url) {
                return $sce.trustAsResourceUrl(url);
            };
        }]);
})();