(function () {
    'use strict';

    angular.module('givesBack.categories')
        .controller('CreateNewCategoryCtrl', CreateNewCategoryCtrl);

    CreateNewCategoryCtrl.$inject = ['$scope', 'CategoryService'];


    /* @ngInject */
    function CreateNewCategoryCtrl($scope, CategoryService) {

        /* jshint validthis: true */
        var vm = this;

        //vm.activate = activate;
        vm.title = 'CreateNewCategoryCtrl';

        vm.trackAudio = function (audio) {
            audio.cls = 'task-clicked';
        };
    }
})();

