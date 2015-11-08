(function () {
    'use strict';

    angular.module('givesBack.categories')
        .factory('newCategory', newCategory);

    newCategory.$inject = ['$ionicModal', 'CategoryService', 'BACKEND', 'fileUpload'];

    /* @ngInject */
    function newCategory($ionicModal, CategoryService, BACKEND, fileUpload) {

        return {
            setupNewCategoryModal: setupNewCategoryModal,
            buttonTemplate: '<i class="icon ion-edit"></i>Edit'
        };

        function setupNewCategoryModal(scope) {

            scope.setFiles = function (element) {
                scope.categoryImage = element.files[0];
            };

            scope.createNewCategory = function (category) {
                fileUpload.uploadFile({
                    file: scope.categoryImage,
                    url: BACKEND.url + '/fileupload',
                    subdir: 'categories'
                }).then(function (result) {
                    var uplaodedFile = result.data[0];
                    var categoryModel = {
                        title: category.title,
                        image: BACKEND.url + '/upload/' + uplaodedFile.subdir + '/' + uplaodedFile.filename

                    };
                    CategoryService.createCategory(categoryModel).then(function (category) {
                        console.log(JSON.stringify(category));
                        scope.newCategoryModal.hide(category);
                    }, function (err) {
                        console.log(err);
                        scope.newCategoryModal.hide();
                    });

                }, function (err) {
                    console.log(err);
                    scope.newCategoryModal.hide();
                });
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
