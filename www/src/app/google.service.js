(function () {
  'use strict';

  angular.module('givesBack')
          .service('GoogleService', GoogleService);

  GoogleService.$inject = ['$http', '$q'];

  function GoogleService($http, $q) {
    var deferred = $q.defer();
    this.googleApiClientReady = function () {
      gapi.client.setApiKey('AIzaSyCNACaUKESswMgG_BEtSO52enF3G-LFV6c');
      gapi.client.load('youtube', 'v3', function () {
        var request = gapi.client.youtube.videos.list({
          part: 'snippet',
          id: 'O0RU_Nyr4l4'
        });
        request.execute(function (response) {
          deferred.resolve(response.result);
        });
      });
      return deferred.promise;
    };
  };
})();
