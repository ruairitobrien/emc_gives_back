(function () {
    'use strict';
    angular.module('starter.topbar', ['ionic', 'starter.settings'])
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

	topbarCtrl.$inject = ['$scope', '$ionicModal', 'settings'];

    function topbarCtrl($scope, $ionicModal, settings){
    	this.settings = settings;

 		$ionicModal.fromTemplateUrl('topbar/topbar.colorPicker.html', {
			scope: $scope,
		    animation: 'slide-in-up'
		}).then(function(modal) {
		    $scope.modal = modal;
		});

		$scope.colours = [
			'default-colour',
			'red-colour',
			'blue-colour',
			'orange-colour',
			'green-colour'
		];

		$scope.setColour = function(col) {
			//document.getElementsByClassName('top-bar')[0].style.backgroundColor = col;
			settings.colour = col;

			$scope.modal.hide();
		}

		this.colourPicker = function(){
			$scope.modal.show();
		}


		this.mute = function () {
			settings.mute = = !settings.mute;

		}
    }
})();
