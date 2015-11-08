(function () {
    'use strict';

    angular
        .module('givesBack')
        .directive('compareTo', compareTo);

    /**
     * Compares one value to another and sets validation on the model in a form.
     * Used for features like re-enter password in signup.
     *
     * @returns {{require: string, scope: {otherModelValue: string}, link: link}}
     */
    function compareTo() {
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: '=compareTo'
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch('otherModelValue', function () {
                    ngModel.$validate();
                });
            }
        };
    }

})();