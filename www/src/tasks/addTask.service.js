(function () {
    'use strict';

    angular.module('givesBack.tasks')
        .factory('addTask', addTask);

    addTask.$inject = ['$ionicModal', '$log', '$ionicPopup', 'HowToService', 'fileUpload', 'dpdConfig'];

    function addTask($ionicModal, $log, $ionicPopup, HowToService, fileUpload, dpdConfig) {
        return {
            setupTaskModal: setupTaskModal,
            buttonTemplate: '<i class="icon"></i>Edit'
        };

        function setupTaskModal(scope) {
            scope.tasks = scope.howto.tasks;
            scope.task = {};
            scope.taskModalProcessing = false;

            scope.setTaskFiles = function (element) {
                scope.taskImage = element.files[0];
            };

            scope.addTask = function () {
                scope.taskModalProcessing = true;
                fileUpload.uploadFile({
                    file: scope.taskImage,
                    url: dpdConfig.serverRoot + '/fileupload',
                    subdir: 'tasks'
                }).then(function (result) {
                    var uplaodedFile = result.data[0];
                    scope.task.image = dpdConfig.serverRoot + '/upload/' + uplaodedFile.subdir + '/' + uplaodedFile.filename;
                    if (!scope.howto.tasks) {
                        scope.howto.tasks = [];
                    }
                    scope.howto.tasks.push(scope.task);
                    HowToService.saveHowTo(scope.howto).then(function (result) {
                        scope.howto = result.data;
                        scope.taskModalProcessing = false;
                        scope.taskModal.hide();
                    }, function (err) {
                        onError(err);
                    }).finally(function () {
                        scope.task = {};
                    });
                }, function (err) {
                    onError(err);
                });
            };

            scope.cancelCreateHowTo = function () {
                scope.howto = null;
                scope.taskModal.hide();
            };

            function onError(err) {
                $log.error(err);
                scope.taskModalProcessing = false;
                $ionicPopup.alert({
                    title: 'Error',
                    content: 'Unfortunately an error occurred creating this Task. Please try again.',
                    okType: 'button-assertive'

                }).then(function () {
                    scope.taskModal.hide();
                });
            }


            return $ionicModal.fromTemplateUrl('tasks/templates/addTask.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }
    }


})();