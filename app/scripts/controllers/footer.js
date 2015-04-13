'use strict';

angular.module('cloudSlangWebsiteApp')
    .controller('FooterCtrl', function ($scope, $rootScope) {
        $scope.scrollToAbout = function () {
            $rootScope.animateToElement($rootScope.sections[2].id);
        };
    });