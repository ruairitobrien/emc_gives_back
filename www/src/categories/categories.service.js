(function () {
    'use strict';

    angular.module('givesBack.categories')
        .factory('CategoryService', CategoryService);

    CategoryService.$inject = ['dpd'];

    /* @ngInject */
    function CategoryService(dpd) {

        var setCategories = function(d){
            this.categories = d;
            };

        var getCategories = function(){
            var me = this;
            dpd.categories.get().success(function(res){
                me.setCategories(res);
            });
        };

        var createCategory = function(data){
            var me = this;
            dpd.categories.post(data).success(function(){
                //update categories obj
                me.getCategories();
            });
        };

        var removeCategory = function(d){
            var me = this;
            dpd.categories.del(d).success(function(){
                //update categories obj
                me.getCategories();
            });
        };

        return {
            categories: {},
            getCategories: getCategories,
            createCategory: createCategory,
            removeCategory: removeCategory,
            setCategories: setCategories
        };
    }

})();
