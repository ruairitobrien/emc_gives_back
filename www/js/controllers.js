angular.module('starter.controllers', ['starter.settings'])

    .controller('MainCtrl', function ($scope, $location, $rootScope, settings) {
        $scope.colour = settings.colour;

        $scope.$watch('settings', function() {
            $scope.colour = settings.colour;
        });

        $rootScope.$on('$locationChangeStart', function(event, newUrl, oldUrl){
            if(settings.locked) {
                event.preventDefault();
                $location.path(oldUrl);
            }
        });

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

