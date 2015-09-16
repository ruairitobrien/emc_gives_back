(function () {
    'use strict';

    angular.module('givesBack.categories')
        .factory('categoryEditor', categoryEditor);

    categoryEditor.$inject = ['$ionicModal', 'CategoryService', 'newCategory'];

    /* @ngInject */
    function categoryEditor($ionicModal, CategoryService, newCategory) {

        return {
            setupCategoryEditorModal: setupCategoryEditorModal,
            buttonTemplate: '<i class="icon ion-edit"></i>Edit'
        };

        function setupCategoryEditorModal(scope) {

            CategoryService.getCategories();

            scope.$watch(function(){
                return CategoryService.categories;
            },function(newVal,oldVal){
                if(newVal && oldVal !== newVal){
                    scope.categories = newVal;
                }
            });

            scope.cancelEditCategories = function () {
                scope.categoryEditorModal.hide();
            };

            newCategory.setupNewCategoryModal(scope).then(function (modal) {
                scope.newCategoryModal = modal;
            });

            scope.newCategory = function () {
                scope.newCategoryModal.show();
            };

            scope.removeCategory = function (id) {
                CategoryService.removeCategory(id);
            };

            return $ionicModal.fromTemplateUrl('categories/templates/edit-categories.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }

    }
})();
