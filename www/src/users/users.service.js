(function () {
    angular
        .module('givesBack.users')
        .service('UserService', UserService);


    UserService.$inject = ['$q', 'authentication'];

    /* @ngInject */
    function UserService($q, authentication) {
        var service = {
            user: null,
            getUser: getUser
        };

        return service;

        ////////////////

        function getUser() {
            var deferred = $q.defer();
            if (!!service.user) {
                deferred.resolve(service.user);
            } else {
                authentication.getLoggedInUser(function (user, error) {
                    if (!!error || !user) {
                        deferred.reject(error);
                    } else {
                        service.user = user;
                        deferred.resolve(user);
                    }
                });
            }
            return deferred.promise;

        }

    }
})();
