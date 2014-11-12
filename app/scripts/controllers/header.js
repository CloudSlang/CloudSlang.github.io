'use strict';

angular.module('scoreWebsiteApp')
    .controller('HeaderCtrl', function ($scope, $rootScope, $document) {
        // hide menu bar on click (small resolutions)
        $document.on('click.nav','.navbar-collapse.in',function(e) {
            if ($(e.target).is('a') || $(e.target).is('button')) {
                $(this).collapse('hide');
            }
        });

        // workaround to remove the current class from the navbar when reaching the header
        $(window).scroll(function() {
            if (!$scope.navInProcess) {
                var windscroll = $(window).scrollTop();
                if (windscroll < 800) {
                    $('.header .nav .current').removeClass('current');
                }
            }
        });

        $rootScope.animateToElement = function (elementId) {
            var element = $('#' + elementId);
            if (element.length) {
                $('html, body').animate({
                    scrollTop: element.offset().top - 50
                }, 400, 'swing');
            }
        };

        $scope.scrollToGettingStarted = function () {
            $rootScope.animateToElement($rootScope.sections[0].id);
        };
    }).directive('onePageNav', ['$timeout', function(timer) {
        return {
            restrict: 'A',
            template: '',
            link: function(scope, element) {
                var onePageNav = function () {
                    element.onePageNav({
                        currentClass: 'current',
                        changeHash: false,
                        scrollSpeed: 400,
                        scrollThreshold: 0.2,
                        filter: '',
                        easing: 'swing',
                        scrollOffset: 300,
                        begin: function() {
                            scope.navInProcess = true;
                        },
                        end: function() {
                            scope.navInProcess = false;
                        }
                    });
                };

                timer(onePageNav, 0); // must be refresh after dom is finished
            }
        };
    }]).directive('scrollTop', [function() {
        return {
            restrict: 'A',
            template: '',
            link: function(scope, element) {
                element.on('click', function(event) {
                    event.preventDefault();
                    $('html, body').animate({scrollTop: 0}, 'slow', function () {
                        $('.header .nav .current').removeClass('current');
                    });
                });
            }
        };
    }]);