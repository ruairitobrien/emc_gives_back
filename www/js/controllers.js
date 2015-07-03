angular.module('starter.controllers', ['starter.settings'])

    .controller('MainCtrl', function ($scope, settings) {
        $scope.colour = settings.colour;
    })
    .controller('DashCtrl', function ($scope) {
    })

    .controller('HealthCtrl', function ($scope) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

    });

