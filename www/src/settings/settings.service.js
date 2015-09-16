(function () {
    'use strict';

    angular.module('givesBack.settings')
        .factory('settings', settings);

    function settings() {
        return {
            colour: 'default-colour',
            locked: false,
            mute: false
        };

    }
})();
