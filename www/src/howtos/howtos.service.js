(function () {
    'use strict';

    angular.module('givesBack.howtos')
        .factory('HowToService', HowToService);

    HowToService.$inject = ['dpd'];

    /* @ngInject */
    function HowToService(dpd) {

        var getHowToByParent = function (categoryId) {
            var me = this;
            dpd.howtos.get({categoryId: categoryId}).success(function (res) {
                me.setHowTos(res);
            });
        };
        var getHowToById = function (id) {
            var me = this;
            dpd.howtos.get({id: id}).success(function (res) {
                me.setSelectedHowTos(res);
            });
        };

        var setHowTos = function (d) {
            this.howtos = d;
        };

        var setSelectedHowTos = function (d) {
            this.selectedhowTo = d;
        };

        var createHowTo = function (data) {
            var me = this;

            dpd.howtos.post(data).success(function (res) {
                if (res) {
                    me.getHowToByParent(data.categoryId); //update the howtos obj with new list
                }
            });
        };

        return {
            howtos: {},
            selectedhowTo: {},
            getHowToByParent: getHowToByParent,
            getHowToById: getHowToById,
            setHowTos: setHowTos,
            setSelectedHowTos: setSelectedHowTos,
            createHowTo: createHowTo
        };
    }

})();
