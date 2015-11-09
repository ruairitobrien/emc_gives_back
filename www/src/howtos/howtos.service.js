(function () {
    'use strict';

    angular.module('givesBack.howtos')
        .factory('HowToService', HowToService);

    HowToService.$inject = ['dpd', '$q'];

    /* @ngInject */
    function HowToService(dpd, $q) {
        var service = {
            howtos: {},
            selectedhowTo: {},
            getHowToByParent: getHowToByParent,
            getHowToById: getHowToById,
            createHowTo: createHowTo,
            saveHowTo: saveHowTo
        };

        return service;

        ////////////////

        function getHowToByParent(categoryId) {
            var deferred = $q.defer();
            dpd.howtos.get({categoryId: categoryId}).success(function (res) {
                service.howtos = res;
                deferred.resolve(service.howtos);
            }, deferred.reject);
            return deferred.promise;
        }

        function getHowToById(id) {
            var deferred = $q.defer();
            dpd.howtos.get({id: id}).success(function (res) {
                service.selectedhowTo = res;
                deferred.resolve(res);
            }, deferred.reject);
            return deferred.promise;
        }

        function createHowTo(data) {
            var deferred = $q.defer();
            dpd.howtos.post(data).success(function (res) {
                if (res) {
                    service.howtos.push(res);
                }
                deferred.resolve(res);
            }, deferred.reject);
            return deferred.promise;
        }

        function saveHowTo(howTo) {
            if (howTo.id) {
                var updated = angular.copy(howTo);
                delete updated.id;
                return dpd.howtos.put(howTo.id, updated);
            } else {
                return createHowTo(howTo);
            }

        }

    }

})();
