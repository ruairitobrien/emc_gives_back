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
                if(this.editPinInput == "1234"){
                    scope.categoryEditorModal.show();
                    scope.editPinModal.hide();
                    this.editPinInput = null;
                    scope.editPinErrorMsg = false;
                } else {
                    scope.editPinErrorMsg = true;
                }
            }

            return $ionicModal.fromTemplateUrl('settings/templates/editPin.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }
    }
})();
