(function () {
    'use strict';

    angular.module('givesBack.categories')
        .factory('newCategory', newCategory);

    newCategory.$inject = ['$ionicModal', '$http', 'CategoryService', 'BACKEND', 'fileUpload'];

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
                    ur: BACKEND.url + '/fileUpload'
                }).then(function onUploadSuccess(data) {
                    var uplaodedFile = data[0];
                    var categoryModel = {
                        title: category.title,
                        image: BACKEND.url + '/upload/' + uplaodedFile.subdir + '/' + uplaodedFile.filename

                    };
                    CategoryService.createCategory(categoryModel).then(function (category) {

                    }, function (err) {
                        console.log(err);
                    });
                    scope.newCategoryModal.hide();
                }, function onUploadFailed(err) {
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
