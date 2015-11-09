(function () {
    'use strict';

    angular.module('givesBack.categories')
        .factory('newCategory', newCategory);

    newCategory.$inject = ['$ionicModal', '$log', '$ionicPopup', 'dpdConfig', 'CategoryService', 'UserService', 'fileUpload'];

    /* @ngInject */
    function newCategory($ionicModal, $log, $ionicPopup, dpdConfig, CategoryService, UserService, fileUpload) {

        return {
            setupNewCategoryModal: setupNewCategoryModal,
            buttonTemplate: '<i class="icon ion-edit"></i>Edit'
        };

        function setupNewCategoryModal(scope) {
            scope.category = {};
            scope.categoryModalProcessing = false;

            scope.setCategoryFiles = function (element) {
                scope.categoryImage = element.files[0];
            };

            scope.createNewCategory = function () {
                scope.categoryModalProcessing = true;
                fileUpload.uploadFile({
                    file: scope.categoryImage,
                    url: dpdConfig.serverRoot + '/fileupload',
                    subdir: 'categories'
                }).then(function (result) {
                    var uplaodedFile = result.data[0];
                    var categoryModel = {
                        title: scope.category.title,
                        image: dpdConfig.serverRoot + '/upload/' + uplaodedFile.subdir + '/' + uplaodedFile.filename,
                        owner: UserService.user.id
                    };
                    CategoryService.createCategory(categoryModel).then(function (category) {
                        $log.log(JSON.stringify(category));
                        scope.categoryModalProcessing = false;
                        scope.newCategoryModal.hide();
                    }, function (err) {
                        onError(err);
                    });
                }, function (err) {
                    onError(err);
                });
            };

            scope.cancelCreateCategory = function () {
                scope.category = null;
                scope.newCategoryModal.hide();
            };

            function onError(err) {
                $log.error(err);
                scope.categoryModalProcessing = false;
                $ionicPopup.alert({
                    title: 'Error',
                    content: 'Unfortunately an error occurred creating this Category. Please try again.',
                    okType: 'button-assertive'

                }).then(function () {
                    scope.newCategoryModal.hide();
                });
            }


            return $ionicModal.fromTemplateUrl('categories/templates/create-new-category.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }

    }
})();
