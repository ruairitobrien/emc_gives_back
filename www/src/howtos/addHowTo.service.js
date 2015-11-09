(function () {
    'use strict';

    angular.module('givesBack.howtos')
        .factory('addHowTo', addHowTo);

    addHowTo.$inject = ['$ionicModal', '$stateParams', 'HowToService', 'fileUpload', 'dpdConfig'];

    /* @ngInject */
    function addHowTo($ionicModal, $stateParams, HowToService, fileUpload, dpdConfig) {

        return {
            setupHowToModal: setupHowToModal,
            buttonTemplate: '<i class="icon"></i>Edit'
        };

        function setupHowToModal(scope) {
            scope.howto = {};

            scope.setFiles = function (element) {
                scope.howtoImage = element.files[0];
            };

            scope.cancelCreateHowTo = function () {
                scope.howto = null;
                scope.howToModal.hide();
            };

            scope.addHowTo = function () {
                fileUpload.uploadFile({
                    file: scope.howtoImage,
                    url: dpdConfig.serverRoot + '/fileupload',
                    subdir: 'howtos'
                }).then(function (result) {
                    var uplaodedFile = result.data[0];
                    var howtoModel = {
                        title: scope.howto.title,
                        video: scope.howto.video,
                        categoryId: $stateParams.categoryId,
                        image: dpdConfig.serverRoot + '/upload/' + uplaodedFile.subdir + '/' + uplaodedFile.filename

                    };

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
