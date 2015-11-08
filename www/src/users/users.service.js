angular
    .module('givesBack.users')
    .factory('authentication', authentication);

authentication.$inject = ['$cookies', '$q', 'dpd', 'dpdConfig'];

/* @ngInject */
function authentication($cookies, $q, dpd, dpdConfig) {
    var service = {
        getLoggedInUser: getLoggedInUser,
        login: login,
        logout: logout
    };

    return service;

    ////////////////

    function getLoggedInUser() {
        return dpd.users.get('me');
    }

    function login(user) {
        var deferred = $q.defer();

        $http.post(dpdConfig.serverRoot + 'users/login', {username: user.username, password: user.password})
            .then(
                function (session, error) {
                    if (error) {
                        deferred.reject(error);
                    } else {
                        $cookies.sid = session.data.id; // set the sid cookie
                        deferred.resolve(session.data);
                    }
                });

        return deferred.promise;
    }

    function logout() {
        dpd.users.get('logout');
    }

}

