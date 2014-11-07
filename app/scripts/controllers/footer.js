'use strict';

angular.module('scoreWebsiteApp')
    .controller('FooterCtrl', function ($scope, $rootScope) {
        $scope.scrollToAbout = function () {
            $rootScope.animateToElement($rootScope.sections[2].id);
        };
    });