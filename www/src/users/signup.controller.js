angular
    .module('givesBack.users')
    .controller('SignupCtrl', SignupCtrl);

SignupCtrl.$inject = ['$state', '$ionicPopup', '$log', 'authentication'];

/* @ngInject */
function SignupCtrl($state, $ionicPopup, $log, authentication) {
    /* jshint validthis: true */
    var vm = this;

    vm.title = 'SignupCtrl';
    vm.signup = signup;

    /**
     * Sign the user up by creating a user using the user service.
     * Alert the user to any errors.
     *
     * @param user
     */
    function signup(user) {
        authentication.signup(user).then(function () {
            $state.go('dashboard');
        }, function (err) {
            $log.log(err);
            var message = err.message || 'An unknown error occurred. Please check your internet connection and try' +
                ' again.';
            if (err.errors.username) {
                message = 'That username is already taken.';
            }
            var alertPopup = $ionicPopup.alert({
                title: 'Signup failed!',
                template: message
            });
        });
    }

}