(function () {
    'use strict';

    angular.module('givesBack.categories')
        .service('CategoryService', CategoryService);

    CategoryService.$inject = ['$q', 'dpd', 'lodash'];

    /* @ngInject */
    function CategoryService($q, dpd, lodash) {
        var categories = {};

        var getCachedCategories = function () {
            return categories;
        };

        var setCategories = function (newCategories) {
            categories = newCategories;
        };

        var getCategories = function () {
            var deferred = $q.defer();

            dpd.categories.get().success(function (res) {
                setCategories(res);
                deferred.resolve(categories);
            }, deferred.reject);

            return deferred.promise;
        };

        var createCategory = function (data) {
            var deferred = $q.defer();

            dpd.categories.post(data).success(function (category) {
                categories.push(category);
            }, deferred.reject);

            return deferred.promise;
        };

        var removeCategory = function (categoryToRemove) {
            var deferred = $q.defer();

            dpd.categories.del(d).success(function () {
                lodash.remove(categories, function (category) {
                    return category.id === categoryToRemove.id;
                }, deferred.reject);
            });

            return deferred.promise;
        };

        return {
            getCachedCategories: getCachedCategories,
            getCategories: getCategories,
            createCategory: createCategory,
            removeCategory: removeCategory,
            setCategories: setCategories
        };
    }

})();
