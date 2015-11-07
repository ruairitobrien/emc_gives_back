(function () {
    'use strict';

    var defaultColours = [
        'pastel-magenta',
        'pastel-pink',
        'pastel-pink2',
        'pastel-red',
        'dark-pastel-red',
        'pastel-blue',
        'pastel-violet',
        'light-pastel-purple',
        'pastel-purple',
        'dark-pastel-purple',
        'pastel-grey',
        'dark-pastel-green',
        'pastel-green',
        'pastel-brown',
        'pastel-yellow',
        'pastel-orange'
    ];

    angular
        .module('givesBack.settings')
        .constant('defaultColours', defaultColours);

})();
