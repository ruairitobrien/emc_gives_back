(function () {
    'use strict';

    angular.module('givesBack.categories')
        .service('CategoryService', CategoryService);

    CategoryService.$inject = ['$q', 'dpd', 'lodash'];

    /* @ngInject */
    function CategoryService($q, dpd, lodash) {
        var self = this;
        this.categories = [];


        this.setCategories = function (newCategories) {
            self.categories = newCategories;
        };

        this.getCategories = function () {
            var deferred = $q.defer();

            dpd.categories.get().success(function (res) {
                self.setCategories(res);
                deferred.resolve(self.categories);
            }, deferred.reject);

            return deferred.promise;
        };

        this.createCategory = function (data) {
            var deferred = $q.defer();

            dpd.categories.post(data).success(function (category) {
                self.categories.push(category);
                deferred.resolve(category);
            }, deferred.reject);

            return deferred.promise;
        };

        this.removeCategory = function (categoryId) {
            var deferred = $q.defer();

            dpd.categories.del(categoryId).success(function () {
                lodash.remove(self.categories, function (category) {
                    return category.id === categoryId;
                }, deferred.reject);
            });

            return deferred.promise;
        };
    }

})();
