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
        '$ionicModal',
        '$ionicNavBarDelegate',
        'HowToService',
        'settings',
        'colourPicker'
    ];

    /* @ngInject */
    function HowToCtrl($scope,
                       $stateParams,
                       $sce,
                       $ionicActionSheet,
                       $ionicModal,
                       $ionicNavBarDelegate,
                       HowToService,
                       settings,
                       colourPicker) {
        /* jshint validthis: true */
        var vm = this;
        var howtoId = $stateParams.howtoId;

        vm.showMenu = showMenu;
        vm.activate = activate;
        vm.title = 'HowToCtrl';
        vm.howto = {};

        vm.trackAudio = function (audio) {
            audio.cls = 'task-clicked';
        };

        activate();

        ////////////////

        function activate() {
            vm.howto = HowToService.getHowToById(howtoId);

            $scope.$watch(function () {
                return HowToService.selectedhowTo;
            }, function (newVal, oldVal) {

                if (newVal !== oldVal) {
                    vm.howto = newVal;

                    vm.hasVideo = (vm.howto.video !== undefined && vm.howto.video !== null);
                    if (vm.hasVideo) {
                        vm.howto.video = (vm.howto.video).replace('watch?v=', 'embed/');
                        vm.videoUrl = $sce.trustAsResourceUrl(vm.howto.video);
                        vm.externalVideo = /^(f|ht)tps?:\/\//i.test(vm.videoUrl);
                    }
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
