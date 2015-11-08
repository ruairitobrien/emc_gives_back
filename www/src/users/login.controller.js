angular
    .module('givesBack.users')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$ionicPopup', '$state', 'authentication'];

/* @ngInject */
function LoginCtrl($ionicPopup, $state, authentication) {
    /* jshint validthis: true */
    var vm = this;

    vm.login = login;
    vm.title = 'LoginCtrl';


    ////////////////

    function login(user) {
        authentication.login(user).then(function (data) {
            console.log(JSON.stringify(data));
            $state.go('dashboard');
        }, function (err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials'
            });
        });
    }
}