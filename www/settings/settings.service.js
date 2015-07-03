(function () {
    'use strict';

    angular.module('starter.settings')
        .factory('settings', settings);

    function settings() {
        this.colour = 'default-colour';
        this.locked = false;
        this.mute = false;
        return this;
    }
})();
