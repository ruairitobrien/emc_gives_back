(function () {
    'use strict';

    angular.module('givesBack.dashboard')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = [
        '$scope',
        '$ionicActionSheet',
        '$ionicNavBarDelegate',
        'CategoryService',
        'settings',
        'colourPicker',
        'editPin',
        'categoryEditor'
    ];

    /* @ngInject */
    function DashboardCtrl($scope,
                           $ionicActionSheet,
                           $ionicNavBarDelegate,
                           CategoryService,
                           settings,
                           colourPicker,
                           editPin,
                           categoryEditor) {
        /* jshint validthis: true */
        var vm = this;
        vm.title = 'DashboardCtrl';

        vm.activate = activate;
        vm.showMenu = showMenu;


        activate();

        ////////////////

        function activate() {

            //initial call to categories
            CategoryService.getCategories().catch(
                function onCategoriesRetrievalFailure(err) {
                    vm.err = err;
                });

            $scope.$watch(function () {
                return CategoryService.categories;
            }, function (newVal) {
                vm.categories = newVal;
            }, true);

            colourPicker.setupColourPickerModal($scope).then(function (modal) {
                $scope.colourPickerModal = modal;
            });
            categoryEditor.setupCategoryEditorModal($scope).then(function (modal) {
                $scope.categoryEditorModal = modal;
            });
            editPin.setupEditPinModal($scope).then(function (modal) {
                $scope.editPinModal = modal;
            });
        }

        function showMenu() {
            $ionicActionSheet.show({
                buttons: [
                    {text: colourPicker.buttonTemplate},
                    {
                        text: (settings.locked) ? '<i class="icon ion-unlocked"></i>Unlock' : '<i class="icon' +
                        ' ion-locked"></i>Lock'
                    },
                    {
                        text: '<i class="icon ion-edit"></i>Edit'
                    }
                ],
                titleText: 'Settings',
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $scope.colourPickerModal.show();
                    } else if (index === 1) {
                        settings.locked = !settings.locked;
                        $ionicNavBarDelegate.showBackButton(!settings.locked);
                    } else if (index === 2) {
                        $scope.editPinModal.show();
                    }

                    return true;
                }
            });
        }

    }
})();