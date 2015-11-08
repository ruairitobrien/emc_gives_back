(function () {
    angular
        .module('givesBack.users')
        .factory('authentication', authentication);


    authentication.$inject = ['$cookieStore', '$cookies', '$q', '$http', 'dpd', 'dpdConfig'];

    /* @ngInject */
    function authentication($cookieStore, $cookies, $q, $http, dpd, dpdConfig) {
        var service = {
            getLoggedInUser: getLoggedInUser,
            login: login,
            logout: logout,
            signup: signup
        };

        return service;

        ////////////////

        function getLoggedInUser() {
            var auth = $cookieStore.get('authdata');
            return $http.get(dpdConfig.serverRoot + '/users/' + auth);
        }

        function login(user) {
            var deferred = $q.defer();

            $http.post(dpdConfig.serverRoot + '/users/login', {username: user.username, password: user.password})
                .then(
                    function (session) {
                        // TODO: Storing user ID to mimic auth data. Temporary hack to keep users logged in as dpd
                        // only supports sessions. Will need to implement different auth on server.
                        $cookieStore.put('authdata', session.data.uid);
                        $cookies.sid = session.data.id; // set the sid cookie
                        deferred.resolve(session.data);
                    }, deferred.reject);

            return deferred.promise;
        }

        function logout() {
            $cookies.remove('authdata');
            return dpd.users.get('logout');
        }

        function signup(user) {
            var deferred = $q.defer();

            dpd.users.post(user).success(function (user) {
                $cookieStore.put('authdata', user.id);
                deferred.resolve(service.user);
            }).error(deferred.reject);

            return deferred.promise;
        }

    }
})();
