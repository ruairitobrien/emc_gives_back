/**
 * Created by ruairiobrien on 04/07/2015.
 */
(function () {
    'use strict';

    angular
        .module('givesBack.howtos')
        .controller('HowToCtrl', HowToCtrl);

    HowToCtrl.$inject = [
        '$scope',
        '$stateParams',
        '$sce',
        '$ionicActionSheet',
        '$ionicNavBarDelegate',
        '$state',
        'HowToService',
        'settings',
        'colourPicker',
        'addTask',
        'editPin'
    ];

    /* @ngInject */
    function HowToCtrl($scope,
                       $stateParams,
                       $sce,
                       $ionicActionSheet,
                       $ionicNavBarDelegate,
                       $state,
                       HowToService,
                       settings,
                       colourPicker,
                       addTask,
                       editPin) {
        /* jshint validthis: true */
        var vm = this;
        var howtoId = $stateParams.howtoId;

        vm.showMenu = showMenu;
        vm.activate = activate;
        vm.openEditor = openEditor;
        vm.title = 'HowToCtrl';
        vm.trackAudio = function (audio) {
            audio.cls = 'task-clicked';
        };

        activate();

        ////////////////

        function activate() {
            if (!howtoId) {
                return $state.go('dashboard');
            }

            $scope.howto = {};
            $scope.howto.tasks = [];
            HowToService.getHowToById(howtoId);

            $scope.$watch(function () {
                return HowToService.selectedhowTo;
            }, function (newVal) {
                $scope.howto = newVal;

                vm.hasVideo = ($scope.howto.video !== undefined && $scope.howto.video !== null);
                if (vm.hasVideo) {
                    $scope.howto.video = ($scope.howto.video).replace('watch?v=', 'embed/');
                    vm.videoUrl = $sce.trustAsResourceUrl($scope.howto.video);
                    vm.externalVideo = /^(f|ht)tps?:\/\//i.test(vm.videoUrl);
                }
            }, true);

            colourPicker.setupColourPickerModal($scope).then(function (modal) {
                $scope.colourPickerModal = modal;
            });

            editPin.setupEditPinModal($scope).then(function (modal) {
                $scope.editPinModal = modal;
            });

            addTask.setupTaskModal($scope).then(function (modal) {
                $scope.taskModal = modal;
            });

            $scope.$on('modal.hidden', function () {
                if ($scope.editShown && $scope.validPin) {
                    $scope.editShown = false;
                    $scope.taskModal.show();
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
