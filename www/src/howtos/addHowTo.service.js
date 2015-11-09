(function () {
    'use strict';

    angular.module('givesBack.howtos')
        .factory('addHowTo', addHowTo);

    addHowTo.$inject = ['$ionicModal', '$stateParams', '$log', '$ionicPopup', 'HowToService', 'fileUpload', 'dpdConfig'];

    /* @ngInject */
    function addHowTo($ionicModal, $stateParams, $log, $ionicPopup, HowToService, fileUpload, dpdConfig) {

        return {
            setupHowToModal: setupHowToModal,
            buttonTemplate: '<i class="icon"></i>Edit'
        };

        function setupHowToModal(scope, categoryId) {
            scope.howto = {};
            scope.howtoModalProcessing = false;

            scope.setHowToFiles = function (element) {
                scope.howtoImage = element.files[0];
            };

            scope.addHowTo = function () {
                scope.howtoModalProcessing = true;
                fileUpload.uploadFile({
                    file: scope.howtoImage,
                    url: dpdConfig.serverRoot + '/fileupload',
                    subdir: 'howtos'
                }).then(function (result) {
                    var uplaodedFile = result.data[0];
                    var howtoModel = {
                        title: scope.howto.title,
                        video: scope.howto.video,
                        categoryId: categoryId,
                        image: dpdConfig.serverRoot + '/upload/' + uplaodedFile.subdir + '/' + uplaodedFile.filename,
                        tasks: []
                    };
                    HowToService.createHowTo(howtoModel).then(function () {
                        scope.howtoModalProcessing = false;
                        scope.howToModal.hide();
                    }, function (err) {
                        onError(err);
                    }).finally(function () {
                        scope.howto = {};
                    });

                }, function (err) {
                    onError(err);
                });
            };

            scope.cancelCreateHowTo = function () {
                scope.howto = null;
                scope.howToModal.hide();
            };

            function onError(err) {
                $log.error(err);
                scope.howtoModalProcessing = false;
                $ionicPopup.alert({
                    title: 'Error',
                    content: 'Unfortunately an error occurred creating this Howto. Please try again.',
                    okType: 'button-assertive'

                }).then(function () {
                    scope.howToModal.hide();
                });
            }


            return $ionicModal.fromTemplateUrl('howtos/templates/addhowto.html', {
                scope: scope,
                animation: 'slide-in-up'
            });
        }
    }
})();
