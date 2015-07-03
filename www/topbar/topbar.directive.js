(function () {
    'use strict';
    angular.module('starter.topbar', ['ionic'])
    	.directive('topBar', topBar)
    	.controller('TopbarCtrl', topbarCtrl);

    topBar.$inject = [];

    function topBar() {
    	return {
    		'restrict': 'E',
    		'templateUrl': 'topbar/topbar-template.html',
    		'controller': 'TopbarCtrl',
    		'controllerAs': 'topbarCtrl'
    	}
    }

topbarCtrl.$inject = ['$scope', '$ionicModal'];

    function topbarCtrl($scope, $ionicModal){
    	this.changeColour = function(){
    		/*$ionicModal.fromTemplateUrl('topbar/topbar.colorPicker.html', {
    			scope: $scope,
			    animation: 'slide-in-up'
			  }).then(function(modal) {
			    $scope.modal = modal;
			  }).then(function(){
			  	$scope.modal.show();
			  });
			  $scope.openModal = function() {
			    $scope.modal.show();
			  };
			  $scope.closeModal = function() {
			    $scope.modal.hide();
			  };*/
    	/*this.showBack = false;
    	this.home = function(){
    		this.showBack = true;
    	}*/
    	}
    }
})();
