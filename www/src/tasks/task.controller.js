/**
 * Created by ruairiobrien on 04/07/2015.
 */
(function () {
    'use strict';

    angular
        .module('givesBack.tasks')
        .controller('TaskCtrl', TaskCtrl);

    TaskCtrl.$inject = ['$stateParams', 'HowToService'];

    /* @ngInject */
    function TaskCtrl($stateParams, HowToService) {
        /* jshint validthis: true */
        var vm = this;
        var howtoId = $stateParams.howtoId;
        var taskIndex = $stateParams.taskIndex;

        vm.activate = activate;
        vm.title = 'TaskCtrl';
        vm.howto = {};
        vm.task = {};

        vm.trackAudio = function (audio) {
            audio.cls = 'task-clicked';
        };

  /*      activate();

        ////////////////

        function activate() {
            console.log('activate');
            vm.howto = HowToService.findById(howtoId);
            vm.task = vm.howto.tasks[taskIndex];
        }*/


    }
})();