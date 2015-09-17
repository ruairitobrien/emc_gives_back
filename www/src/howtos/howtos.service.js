(function () {
    'use strict';

    angular.module('givesBack.howtos')
        .factory('HowToService', HowToService);

    HowToService.$inject = ['dpd'];

    /* @ngInject */
    function HowToService(dpd) {

        var getHowToByParent = function(cat){
                var me = this;
                dpd.howtos.get({parentId: cat}).success(function(res){
                    me.setHowTos(res);
                })
            };
        var getHowToById = function(id){
                var me = this;
                dpd.howtos.get({id: id}).success(function(res){
                    me.setSelectedHowTos(res);
                })
            };

        var setHowTos = function(d){
                this.howtos = d;
            };

        var setSelectedHowTos = function(d){
            this.selectedhowTo = d;
        };

        return {
            howtos: {},
            selectedhowTo: {},
            getHowToByParent: getHowToByParent,
            getHowToById: getHowToById,
            setHowTos: setHowTos,
            setSelectedHowTos: setSelectedHowTos
        };
    }

})();
