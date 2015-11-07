(function () {
    'use strict';

    var defaultColours = [
        'pastel-blue',
        'pastel-pink',
        'pastel-purple',
        'pastel-red',
        'dark-pastel-purple',
        'pastel-grey',
        'dark-pastel-green',
        'light-pastel-purple',
        'pastel-magenta',
        'dark-pastel-red',
        'pastel-orange',
        'pastel-brown',
        'pastel-yellow',
        'pastel-pink2',
        'pastel-violet',
        'pastel-green'
    ];

    angular
        .module('givesBack.settings')
        .constant('defaultColours', defaultColours);

})();
