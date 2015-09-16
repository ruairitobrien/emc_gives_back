(function () {
    'use strict';

    angular.module('givesBack.settings')
        .factory('colourPicker', colourPicker);

    colourPicker.$inject = ['$ionicModal', 'settings', 'defaultColours'];

    /* @ngInject */
    function colourPicker($ionicModal, settings, defaultColours) {

        return {
            setupColourPickerModal: setupColourPickerModal,
            buttonTemplate: '<i class="icon ion-paintbrush"></i>Theme'
        };

        function setupColourPickerModal(scope) {
            scope.colours = defaultColours;

            scope.setColour = function (colour) {
                settings.colour = colour;

                scope.colourPickerModal.hide();
            };

            return $ionicModal.fromTemplateUrl('settings/templates/colorPicker.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }

    }
})();
