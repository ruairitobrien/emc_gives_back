angular
    .module('givesBack.users')
    .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$ionicPopup', '$ionicHistory', '$state', 'authentication'];

/* @ngInject */
function LoginCtrl($ionicPopup, $ionicHistory, $state, authentication) {
    /* jshint validthis: true */
    var vm = this;

    vm.login = login;
    vm.title = 'LoginCtrl';


    ////////////////

    function login(user) {
        authentication.login(user).then(function (session) {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('dashboard', {}, {location: "replace", reload: true});
        }, function (err) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials'
            });
        });
    }
}