(function () {
    'use strict';

    angular.module('givesBack.howtos')
        .factory('HowToService', HowToService);

    HowToService.$inject = ['lodash', 'defaultHowTos','dpd'];

    /* @ngInject */
    function HowToService(lodash, defaultHowTos,dpd) {

        return {

            howtos: {},

            selectedhowTo: {},

            getHowToByParent: function(cat){
                var me = this;
                dpd.howtos.get({parentId: cat}).success(function(res){
                    me.setHowTos(res);
                })
            },
            getHowToById: function(id){
              var me = this;
                dpd.howtos.get({id: id}).success(function(res){
                    me.setSelectedHowTos(res);
                })
            },
            setHowTos: function(d){
                this.howtos = d;
            },
            setSelectedHowTos: function(d){
                this.selectedhowTo = d;
            }

        };
    }

})();
