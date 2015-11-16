(function () {
  'use strict';

  angular.module('givesBack')
          .service('GoogleService', GoogleService);

  GoogleService.$inject = ['$http', '$q'];

  function GoogleService($http, $q) {
    var deferred = $q.defer(),
    videoID = '',

    // Pulling YouTube Video ID's from URLs - http://stackoverflow.com/a/27728417/3364993
    regex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;

    this.setupYouTubeApiClient = function () {
      gapi.client.setApiKey('AIzaSyCNACaUKESswMgG_BEtSO52enF3G-LFV6c');
      gapi.client.load('youtube', 'v3');
    }

    this.getYouTubeSnippet = function (videoUrl) {
      videoID = videoUrl.match(regex);
      var request = gapi.client.youtube.videos.list({
        part: 'snippet',
        id: videoID[1]
      });
      request.execute(function (response) {
        deferred.resolve(response.result);
      });
      return deferred.promise;
    };
  };
})();
