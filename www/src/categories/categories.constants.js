(function () {
    'use strict';

    var defaultCategories = [
        {
            id: 0,
            title: 'Personal',
            image: 'img/personal.png'
        },
        {
            id: 1,
            title: 'Health',
            image: 'img/health.png'
        }
    ];

    angular
        .module('givesBack.categories')
        .constant('defaultCategories', defaultCategories);

})();
