(function () {
    'use strict';

    angular
        .module('givesBack')
        .factory('fileUpload', fileUpload);

    fileUpload.$inject = ['$q', '$http', 'uuid'];

    /* @ngInject */
    function fileUpload($q, $http, uuid) {
        return {
            uploadFile: uploadFile
        };

        ////////////////

        function uploadFile(args) {
            return $q(function (resolve, reject) {
                var file = args.file;
                var url = args.url;
                if (!!args.file && !!args.url) {
                    var fd = new FormData();
                    fd.append('uploadedFile', file);
                    var uniqueFilename = uuid.v4() + file.name;
                    var uploadUrl = url + '?uniqueFilename=' + uniqueFilename +
                        ((!!args.subdir) ? '&subdir=' + args.subdir : '') +
                        ((!!args.comment) ? '&comment=' + args.comment : '');
                    $http.post(uploadUrl, fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    }, resolve, reject);
                } else {
                    var errorMessage = (!!args.url && !!args.file) ?
                        'URL and File are both empty and are both required' :
                        (!!args.url) ?
                            'File is empty and is required' :
                            'Url is empty and is required';
                    reject(new Error(errorMessage));
                }
            });

        }

    }

})();