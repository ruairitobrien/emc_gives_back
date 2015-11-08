(function () {
    'use strict';

    angular.module('givesBack.howtos')
        .factory('addHowTo', addHowTo);

    addHowTo.$inject = ['$ionicModal', '$stateParams', 'settings', 'HowToService', 'fileUpload', 'dpdConfig'];

    /* @ngInject */
    function addHowTo($ionicModal, $stateParams, settings, HowToService, fileUpload, dpdConfig) {

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

            scope.setFiles = function (element) {
                scope.howtoImage = element.files[0];
            };

            scope.addHowTo = function(howTo){

                fileUpload.uploadFile({
                    file: scope.howtoImage,
                    url: dpdConfig.serverRoot + '/fileupload',
                    subdir: 'howtos'
                }).then(function (result) {
                    var uplaodedFile = result.data[0];
                    var howtoModel = {
                        title: howTo.title,
                        videoUrl: howTo.videoUrl,
                        categoryId: $stateParams.categoryId,
                        image: dpdConfig.serverRoot + '/upload/' + uplaodedFile.subdir + '/' + uplaodedFile.filename

                    };
                    if (!!scope.tasks) {
                        //append image to tasks, this is default as image uploads need to be handled
                        scope.tasks.forEach(function (d) {
                            d.image = '../img/brushteeth.jpg';
                        });

                        //append tasks to howto obj
                        howtoModel.tasks = scope.tasks;
                    }

                    HowToService.createHowTo(howtoModel); //pass howto obj to service

                    scope.howToModal.hide();

                }, function (err) {
                    console.log(err);
                    scope.howToModal.hide();
                });

            };

            return $ionicModal.fromTemplateUrl('howtos/templates/addhowto.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }
    }
})();
