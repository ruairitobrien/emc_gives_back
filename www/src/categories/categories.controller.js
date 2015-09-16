(function () {
    'use strict';

    angular.module('givesBack.categories')
        .controller('CategoryCtrl', CategoryCtrl);

    CategoryCtrl.$inject = [
        '$scope',
        '$stateParams',
        '$ionicActionSheet',
        '$ionicModal',
        '$ionicNavBarDelegate',
        'CategoryService',
        'HowToService',
        'settings',
        'colourPicker'
    ];

    /* @ngInject */
    function CategoryCtrl($scope,
                          $stateParams,
                          $ionicActionSheet,
                          $ionicModal,
                          $ionicNavBarDelegate,
                          CategoryService,
                          HowToService,
                          settings,
                          colourPicker) {
        /* jshint validthis: true */
        var vm = this;
        var categoryId = $stateParams.categoryId;
        vm.category = {};
        vm.howtos = [];
        vm.activate = activate;
        vm.showMenu = showMenu;
        vm.title = 'CategoryCtrl';

        activate();

        ////////////////

        function activate() {
            vm.howtos = HowToService.getHowToByParent(categoryId);

            $scope.$watch(function () {
                return HowToService.howtos;
            }, function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    vm.howtos = newVal;
                }
            },true);


            colourPicker.setupColourPickerModal($scope).then(function (modal) {
                $scope.colourPickerModal = modal;
            });
        }

        function showMenu() {
            $ionicActionSheet.show({
                buttons: [
                    {text: colourPicker.buttonTemplate},
                    {
                        text: (settings.locked) ? '<i class="icon ion-unlocked"></i>Unlock' : '<i class="icon' +
                        ' ion-locked"></i>Lock'
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
                    }
                    return true;
                }
            });
        }

    }
})();

