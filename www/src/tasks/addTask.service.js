(function () {
    'use strict';

    angular.module('givesBack.tasks')
        .factory('addTask', addTask);

    addTask.$inject = ['$ionicModal', '$stateParams'];

    function addTask($ionicModal, $stateParams) {
        return {
            setupTaskModal: setupTaskModal,
            buttonTemplate: '<i class="icon"></i>Edit'
        };

        function setupTaskModal(scope) {
            scope.task = {};

            scope.addTask = function (t) {

                //push task to task list
                scope.howto.tasks.push({'taskName': t.taskname, 'taskDesc': t.taskdesc});

                //clear values for input boxes
                t.taskname = '';
                t.taskdesc = '';

            };

            return $ionicModal.fromTemplateUrl('tasks/templates/addTask.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }
    }


})();