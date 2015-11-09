(function () {
    'use strict';

    angular.module('givesBack.categories')
        .factory('newCategory', newCategory);

    newCategory.$inject = ['$ionicModal', '$log', 'dpdConfig', 'CategoryService', 'UserService', 'fileUpload'];

    /* @ngInject */
    function newCategory($ionicModal, $log, dpdConfig, CategoryService, UserService, fileUpload) {

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
                    url: dpdConfig.serverRoot + '/fileupload',
                    subdir: 'categories'
                }).then(function (result) {
                    var uplaodedFile = result.data[0];
                    var categoryModel = {
                        title: category.title,
                        image: dpdConfig.serverRoot + '/upload/' + uplaodedFile.subdir + '/' + uplaodedFile.filename,
                        owner: UserService.user.id
                    };
                    CategoryService.createCategory(categoryModel).then(function (category) {
                        $log.log(JSON.stringify(category));
                        scope.newCategoryModal.hide(category);
                    }, function (err) {
                        $log.error(err);
                        scope.newCategoryModal.hide();
                    });

                }, function (err) {
                    $log.error(err);
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
