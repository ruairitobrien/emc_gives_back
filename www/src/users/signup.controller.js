angular
    .module('givesBack.users')
    .controller('SignupCtrl', SignupCtrl);

SignupCtrl.$inject = [''];

/* @ngInject */
function SignupCtrl() {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'SignupCtrl';

    activate();

    ////////////////

    function activate() {
    }

}