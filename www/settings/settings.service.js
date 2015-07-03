(function () {
    'use strict';

    angular.module('starter.settings')
        .factory('settings', settings);

    function settings() {
        return {
            colour: 'default-colour',
            locked: true,
            mute: false
        }

    }

})();
