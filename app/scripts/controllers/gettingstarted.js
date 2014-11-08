'use strict';

angular.module('scoreWebsiteApp')
    .controller('GettingStartedCtrl', function ($scope) {
        $scope.items = ['download', 'embed'];
        $scope.selectedItem = $scope.items[0];
        $scope.selected = false;

        $scope.selectItem = function (item) {
            if ($scope.selected) {
                $scope.selectedItem = item;
                hljs.initHighlighting();
            }
        };

        $scope.showCli = function (elemendId, commands) {
            $('#' + elemendId + '-cursor').empty();
            $('#' + elemendId).typed({
                strings: commands,
                typeSpeed: 0
            });
        };

        function expandDetailedBox() {
            $('#detailedBox').css({ display: 'inline-block' });
            $('#detailedBox').transition({ y: '-230px' }, 1200, 'ease-in-out');
            $scope.finishedAnimation = true;
            $scope.$apply();
        }

        $scope.boxClick = function () {
            if (!$scope.selected) {
                $scope.selected = !$scope.selected || false;
                $('.box-container').css({ 'padding-top': '35px' });
                $('.box-image').css({ 'margin-top': '10px' });
                $('#embedbox').css({ cursor: 'pointer' });
                $('#downloadbox').css({ cursor: 'pointer' });
                $('#downloadbox').transition({ x: '-300px', y: '-50px', scale: [0.587, 0.5]}, 1200, 'ease-in-out');
                $('#embedbox').transition({ x: '298px', y: '-205px', scale: [0.587, 0.5]}, 1200, 'ease-in-out', expandDetailedBox);
            }
        };
    });