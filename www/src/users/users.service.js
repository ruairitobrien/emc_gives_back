(function () {
    angular
        .module('givesBack.users')
        .service('UserService', UserService);


    UserService.$inject = ['$q', '$log', 'authentication'];

    /* @ngInject */
    function UserService($q, $log, authentication) {
        var service = {
            user: null,
            getUser: getUser
        };

        return service;

        ////////////////

        /**
         * Gets the stored user in the service.
         * If the user is not stored it will attempt to fetch the user using the sid cookie.
         * If that fails an error will be returned.
         *
         * @returns {l.promise|{then, catch, finally}|*}
         */
        function getUser() {
            var deferred = $q.defer();
            if (!!service.user) {
                deferred.resolve(service.user);
            } else {
                authentication.getLoggedInUser().then(function (user) {
                    if (!user) {
                        var error = new Error('User not logged in');
                        $log.error(error);
                        deferred.reject(error);
                    } else {
                        service.user = user;
                        deferred.resolve(service.user);
                    }
                }, function (err) {
                    $log.error(err);
                    deferred.reject(err);
                });
            }
            return deferred.promise;

        }

    }
})();
