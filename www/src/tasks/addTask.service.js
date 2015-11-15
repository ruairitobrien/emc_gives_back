(function () {
    'use strict';

    angular.module('givesBack.tasks')
        .factory('addTask', addTask);

    addTask.$inject = ['$q', '$ionicModal', '$log', '$ionicPopup', 'HowToService', 'fileUpload', 'dpdConfig'];

    function addTask($q, $ionicModal, $log, $ionicPopup, HowToService, fileUpload, dpdConfig) {
        return {
            setupTaskModal: setupTaskModal,
            buttonTemplate: '<i class="icon"></i>Edit'
        };

        function setupTaskModal(scope) {
            scope.task = {};
            scope.taskModalProcessing = false;

            scope.setTaskFiles = function (element) {
                scope.taskImage = element.files[0];
            };

            scope.setTaskAudio = function (element) {
                scope.taskAudio = element.files[0];
            };

            scope.addTask = function () {
                scope.taskModalProcessing = true;

                var taskArgs = {
                    taskImage: scope.taskImage,
                    taskAudio: scope.taskAudio,
                    serverRoot: dpdConfig.serverRoot,
                    task: scope.task
                };

                var taskUpload = uploadTaskImage(taskArgs);

                if (scope.taskAudio) {
                    taskUpload = taskUpload.then(uploadTaskAudio);
                }

                taskUpload.then(function (result) {
                    saveTask(result);
                }, onError);

            };

            scope.cancelCreateHowTo = function () {
                scope.howto = null;
                scope.taskModal.hide();
            };

            function uploadTaskImage(args) {
                return $q(function (resolve, reject) {
                    fileUpload.uploadFile({
                        file: args.taskImage,
                        url: dpdConfig.serverRoot + '/fileupload',
                        subdir: 'tasks'
                    }).then(function (result) {
                        var imageFile = result.data[0];
                        args.task.image = args.serverRoot + '/upload/' + imageFile.subdir + '/' + imageFile.filename;
                        resolve(args);
                    }, reject);
                });
            }

            function uploadTaskAudio(args) {
                return $q(function (resolve, reject) {
                    return fileUpload.uploadFile({
                        file: args.taskAudio,
                        url: args.serverRoot + '/fileupload',
                        subdir: 'tasks'
                    }).then(function (result) {
                        var audioFile = result.data[0];
                        args.task.audio = args.serverRoot + '/upload/' + audioFile.subdir + '/' + audioFile.filename;
                        resolve(args);
                    }, reject);
                });
            }

            function saveTask(args) {
                if (!scope.howto.tasks) {
                    scope.howto.tasks = [];
                }
                scope.howto.tasks.push(args.task);
                HowToService.saveHowTo(scope.howto).then(function (result) {
                    scope.howto = result.data;
                    scope.taskModalProcessing = false;
                    scope.taskModal.hide();
                }, function (err) {
                    onError(err);
                }).finally(function () {
                    scope.task = {};
                });
            }

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