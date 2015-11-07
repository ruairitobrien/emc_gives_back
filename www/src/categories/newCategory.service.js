(function () {
    'use strict';

    angular.module('givesBack.categories')
        .factory('newCategory', newCategory);

    newCategory.$inject = ['$ionicModal', '$http', 'CategoryService', 'BACKEND', 'uuid'];

    /* @ngInject */
    function newCategory($ionicModal, $http, CategoryService, BACKEND, uuid) {

        return {
            setupNewCategoryModal: setupNewCategoryModal,
            buttonTemplate: '<i class="icon ion-edit"></i>Edit'
        };

        function setupNewCategoryModal(scope) {


            scope.setFiles = function (element) {
                scope.categoryImage = element.files[0];
            };

            scope.createNewCategory = function (category) {
                uploadFile(scope.categoryImage).success(function (data) {
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
                    })
                    .error(function (err) {
                        console.log(err);
                        scope.newCategoryModal.hide();
                    });

            };

            scope.cancelCreateCategory = function () {
                scope.newCategoryModal.hide();
            };

            function uploadFile(file) {
                var fd = new FormData();
                fd.append('uploadedFile', file);
                var uploadUrl = BACKEND.url + '/fileupload?subdir=' + uuid.v1();
                return $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            }

            return $ionicModal.fromTemplateUrl('categories/templates/create-new-category.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }

    }
})();
