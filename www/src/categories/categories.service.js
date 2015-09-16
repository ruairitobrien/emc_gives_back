(function () {
    'use strict';

    angular.module('givesBack.categories')
        .factory('CategoryService', CategoryService);

    CategoryService.$inject = ['lodash','dpd'];

    /* @ngInject */
    function CategoryService(lodash,dpd) {

        return {

            categories: {},

            getCategories: function(){
                var me = this;
                dpd.categories.get().success(function(res){
                    me.setCategories(res);
                });
            },
            setCategories: function(d){
                this.categories = d;
            },
            createCategory: function(data){
                var me = this;
                dpd.categories.post(data).success(function(){
                    //update categories obj
                    me.getCategories();
                });
            },
            removeCategory: function(d){
                var me = this;
                dpd.categories.del(d).success(function(){
                    //update categories obj
                    me.getCategories();
                });
            }
        };
    }

})();
