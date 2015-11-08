angular
    .module('givesBack.users')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$ionicPopup', '$state', 'authentication'];

/* @ngInject */
function LoginCtrl($ionicPopup, $state, authentication) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.login = login;
    vm.title = 'LoginCtrl';
    vm.user = {};


    activate();

    ////////////////

    function activate() {
    }

    function login() {
        authentication.login(vm.user).success(function (data) {
            $state.go('dashboard');
        }).error(function (data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
            alertPopup.then(function () {
                $state.go('signup');
            });
        });
    }
}