(function () {
    'use strict';

    angular.module('givesBack.howtos')
        .factory('HowToService', HowToService);

    HowToService.$inject = ['dpd'];

    /* @ngInject */
    function HowToService(dpd) {
        var service = {
            howtos: {},
            selectedhowTo: {},
            getHowToByParent: getHowToByParent,
            getHowToById: getHowToById,
            createHowTo: createHowTo
        };

        return service;

        ////////////////

        function getHowToByParent(categoryId) {
            dpd.howtos.get({categoryId: categoryId}).success(function (res) {
                service.howtos = res;
            });
        }

        function getHowToById(id) {
            dpd.howtos.get({id: id}).success(function (res) {
                service.selectedhowTo = res;
            });
        }

        function createHowTo(data) {
            dpd.howtos.post(data).success(function (res) {
                if (res) {
                    service.howtos.push(res);
                }
            });
        }

    }

})();
