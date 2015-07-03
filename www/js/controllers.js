angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('HealthCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

        $scope.washTasks = [{
                img: 'img/health/washing/how_to/tap.png',
                audio: 'audio/health/washing/how_to/TurnTap.mp3'
            },
            {
                img: 'img/health/washing/how_to/wet.png',
                audio: 'audio/health/washing/how_to/WetHands.mp3'
            },
            {
                img: 'img/health/washing/how_to/soap.png',
                audio: 'audio/health/washing/how_to/GetSoap.mp3'
            },
            {
                img: 'img/health/washing/how_to/rub.png',
                audio: 'audio/health/washing/how_to/RubHands.mp3'
            },
            {
                img: 'img/health/washing/how_to/rinse.png',
                audio: 'audio/health/washing/how_to/RinseHands.mp3'
            },
            {
                img: 'img/health/washing/how_to/dry.png',
                audio: 'audio/health/washing/how_to/DryHands.mp3'
            }];

  
})

