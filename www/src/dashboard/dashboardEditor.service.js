(function () {
    'use strict';

    angular.module('givesBack.categories')
        .factory('dashboardEditor', dashboardEditor);

    dashboardEditor.$inject = ['$ionicModal', 'CategoryService', 'newCategory'];

    /* @ngInject */
    function dashboardEditor($ionicModal, CategoryService, newCategory) {

        return {
            setupDashboardEditorModal: setupDashboardEditorModal,
            buttonTemplate: '<i class="icon ion-edit"></i>Edit'
        };

        function setupDashboardEditorModal(scope) {

            CategoryService.getCategories();

            scope.$watch(function () {
                return CategoryService.categories;
            }, function (newVal, oldVal) {
                if (newVal && oldVal !== newVal) {
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

            return $ionicModal.fromTemplateUrl('dashboard/templates/editDashboard.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }
    }
})();
