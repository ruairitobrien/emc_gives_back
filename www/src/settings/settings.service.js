(function () {
    'use strict';

    angular.module('givesBack.settings')
        .factory('settings', settings);

    function settings() {
        return {
            colour: 'pastel-blue',
            locked: false,
            mute: false
        };

    }
})();
