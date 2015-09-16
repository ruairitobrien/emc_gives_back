(function () {
    'use strict';

    var defaultColours = [
        'default-colour',
        'red-colour',
        'blue-colour',
        'purple-colour',
        'green-colour'
    ];

    angular
        .module('givesBack.settings')
        .constant('defaultColours', defaultColours);

})();
