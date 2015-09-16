(function () {
    'use strict';

    angular.module('givesBack.categories')
        .factory('newCategory', newCategory);

    newCategory.$inject = ['$ionicModal', 'CategoryService','dpd'];

    /* @ngInject */
    function newCategory($ionicModal, CategoryService, dpd) {

        return {
            setupNewCategoryModal: setupNewCategoryModal,
            buttonTemplate: '<i class="icon ion-edit"></i>Edit'
        };

        function setupNewCategoryModal(scope) {

            scope.createNewCategory = function (category) {

                // Default image being put here for now
                var categoryModel = {
                    title: category.title,
                    image: 'img/sun.jpg'
                };

                CategoryService.createCategory(categoryModel);

                scope.newCategoryModal.hide();
            };

            scope.cancelCreateCategory = function () {
                scope.newCategoryModal.hide();
            };

            return $ionicModal.fromTemplateUrl('categories/templates/create-new-category.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }

    }
})();
