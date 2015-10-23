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
            scope.editPinSubmit = function() {
                if(scope.editPinModal.el.getElementsByClassName('edit-pin-input')[0].value == "1234"){
                    scope.categoryEditorModal.show();
                    scope.editPinModal.hide();
                }
            }

            return $ionicModal.fromTemplateUrl('settings/templates/editPin.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }
    }
})();
