(function () {
    'use strict';
    angular.module('starter.topbar').directive('topBar', topBar);


    topBar.$inject = [];

    function topBar() {
        return {
            templateUrl: 'topbar/topbar-template.html'
        }
    }

})();
