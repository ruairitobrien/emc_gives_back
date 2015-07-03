(function () {
    'use strict';

    angular.module('starter.settings')
        .factory('settings', settings);

    function settings() {
        return {
            colour: '#fad2ab',
            locked: false,
            mute: false
        }

    }

})();
