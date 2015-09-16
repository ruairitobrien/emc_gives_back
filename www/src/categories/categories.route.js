(function () {
    'use strict';

    angular.module('givesBack.categories')
        .config(function ($stateProvider) {
            $stateProvider
                .state('category', {
                    url: '/categories/:categoryId',
                    templateUrl: 'categories/templates/category.html',
                    controller: 'CategoryCtrl as categoryCtrl'
                })
                .state('newcategory', {
                    url: '/newcategory',
                    templateUrl: 'categories/templates/create-new-category.html',
                    controller: 'CreateNewCategoryCtrl'

                });
        });
})();