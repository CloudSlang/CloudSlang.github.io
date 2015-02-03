'use strict';

angular.module('scoreWebsiteApp')
    .controller('GettingStartedCtrl', function ($scope) {
        $scope.highlightIt = function () {
            hljs.initHighlighting();
        };
});
