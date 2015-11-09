(function () {
    'use strict';

    angular.module('givesBack.settings')
        .factory('editPin', editPin);

    editPin.$inject = ['$ionicModal', 'settings'];

    function editPin($ionicModal, settings) {

        return {
            setupEditPinModal: setupEditPinModal
        };

        function setupEditPinModal(scope) {
            scope.validPin = false;

            scope.editPinSubmit = function () {
                if (this.pin === '1234') {
                    scope.validPin = true;
                    this.pin = null;
                    scope.editPinModal.hide();
                }
            };

            scope.cancelPin = function () {
                this.pin = null;
                scope.editPinModal.hide();
            };

            return $ionicModal.fromTemplateUrl('settings/templates/editPin.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }
    }
})();
