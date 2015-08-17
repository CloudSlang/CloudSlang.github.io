'use strict';

angular.module('cloudSlangWebsiteApp')
    .controller('HeaderController', function ($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

    });
