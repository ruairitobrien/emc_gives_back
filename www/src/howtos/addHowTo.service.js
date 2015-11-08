(function () {
    'use strict';

    angular.module('givesBack.howtos')
        .factory('addHowTo', addHowTo);

    addHowTo.$inject = ['$ionicModal', '$stateParams', 'settings', 'HowToService'];

    /* @ngInject */
    function addHowTo($ionicModal,  $stateParams, settings, HowToService) {

        return {
            setupHowToModal: setupHowToModal,
            buttonTemplate: '<i class="icon"></i>Edit'
        };

        function setupHowToModal(scope) {

            var taskArr = [];

            scope.navigateForm = function(){
                scope.showTasksPage = !scope.showTasksPage;
            };

            scope.addTask = function(t){

                //push task to task list
                taskArr.push({'taskName': t.taskname, 'taskDesc': t.taskdesc});

                //set task list on scope
                scope.tasks = taskArr;

                //clear values for input boxes
                t.taskname = '';
                t.taskdesc = '';

            };

            scope.addHowTo = function(howTo){

                //get category from params & append it to the model
                var catId = $stateParams.categoryId;
                howTo.parentId = catId;

                //append image, this is a default image, image uploads need to be handled
                howTo.image = '../img/brushteeth.jpg';

                //append image to tasks, this is default as image uploads need to be handled
                scope.tasks.forEach(function(d){
                    d.image = '../img/brushteeth.jpg';
                });

                //append tasks to howto obj
                howTo.tasks = scope.tasks;

                HowToService.createHowTo(catId, howTo); //pass howto obj to service

                scope.howToModal.hide();
            };

            return $ionicModal.fromTemplateUrl('howtos/templates/addhowto.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }
    }
})();
