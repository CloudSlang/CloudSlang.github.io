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
                typeSpeed: 30
            });
        };

        function expandDetailedBox() {
            $('#detailedBox').css({ display: 'inline-block' });
            $('#detailedBox').transition({ y: '-230px' }, 1200, 'ease-in-out', function () {
                $scope.finishedAnimation = true;
                $scope.animationInProgress = false;
                $scope.$apply();
            });
        }

        $scope.animationInProgress = false;
        $scope.boxClick = function (clickedItem) {
            if ($(window).width() > 766) {
                if (!$scope.selected && !$scope.animationInProgress) {
                    $scope.animationInProgress = true;
                    $scope.finishedAnimation = false;
                    $scope.selected = !$scope.selected || false;
                    $('.box-container').css({ 'padding-top': '35px' });
                    $('.box-image').css({ 'margin-top': '-5px' });
                    $('#embedbox').css({ cursor: 'pointer' });
                    $('#downloadbox').css({ cursor: 'pointer' });
                    $('#downloadbox').transition({ x: '-300px', y: '-50px', scale: [0.587, 0.5]}, 1200, 'ease-in-out');
                    $('#embedbox').transition({ x: '298px', y: '-205px', scale: [0.587, 0.5]}, 1200, 'ease-in-out', expandDetailedBox);
                } else if ($scope.selected && $scope.selectedItem === clickedItem && !$scope.animationInProgress) {
                    $scope.animationInProgress = true;
                    $scope.finishedAnimation = true;
                    $('#detailedBox').css({ display : 'none' });
                    $('#downloadbox').transition({ x: '0px', y: '0px', scale: [1, 1]}, 1200, 'ease-in-out');
                    $('#embedbox').transition({ x: '0px', y: '0px', scale: [1, 1]}, 1200, 'ease-in-out', function () {
                        $scope.finishedAnimation = false;
                        $scope.selected = !$scope.selected || false;
                        $scope.animationInProgress = false;
                        $scope.$apply();
                    });
                    $('.box-container').css({ 'padding-top': '27px' });
                    $('.box-image').css({ 'margin-top': '2px' });
                }
            }
        };
    });