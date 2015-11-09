(function () {
    'use strict';

    angular.module('givesBack.categories')
        .controller('CategoryCtrl', CategoryCtrl);

    CategoryCtrl.$inject = [
        '$scope',
        '$stateParams',
        '$ionicActionSheet',
        '$ionicNavBarDelegate',
        'HowToService',
        'addHowTo',
        'settings',
        'colourPicker',
        'editPin'
    ];

    /* @ngInject */
    function CategoryCtrl($scope,
                          $stateParams,
                          $ionicActionSheet,
                          $ionicNavBarDelegate,
                          HowToService,
                          addHowTo,
                          settings,
                          colourPicker,
                          editPin) {
        /* jshint validthis: true */
        var vm = this;
        var categoryId = $stateParams.categoryId;
        vm.category = {};
        vm.howtos = [];
        vm.activate = activate;
        vm.showMenu = showMenu;
        vm.openEditor = openEditor;
        vm.title = 'CategoryCtrl';

        activate();

        ////////////////

        function activate() {

            HowToService.getHowToByParent(categoryId);

            $scope.$watch(function () {
                return HowToService.howtos;
            }, function (newVal) {
                vm.howtos = newVal;
            });

            colourPicker.setupColourPickerModal($scope).then(function (modal) {
                $scope.colourPickerModal = modal;
            });

            editPin.setupEditPinModal($scope).then(function (modal) {
                $scope.editPinModal = modal;
            });

            addHowTo.setupHowToModal($scope, categoryId).then(function (modal) {
                $scope.howToModal = modal;
            });

            $scope.$on('modal.hidden', function () {
                if ($scope.editShown && $scope.validPin) {
                    $scope.editShown = false;
                    $scope.howToModal.show();
                }
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
                        $scope.locked = settings.locked = !settings.locked;
                        $ionicNavBarDelegate.showBackButton(!settings.locked);
                    } else if (index === 2) {
                        openEditor();
                    }
                    return true;
                }
            });
        }

        function openEditor() {
            $scope.editShown = true;
            $scope.editPinModal.show();
        }

    }
})();

