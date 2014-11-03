'use strict';

angular.module('scoreWebsiteApp')
    .controller('HeaderCtrl', function () {
        // hide menu bar on click (small resolutions)
        $(document).on('click.nav','.navbar-collapse.in',function(e) {
            if ($(e.target).is('a') || $(e.target).is('button')) {
                $(this).collapse('hide');
            }
        });
    }).directive('onePageNav', ['$timeout', function(timer) {
        return {
            restrict: 'A',
            template: '',
            link: function(scope, element) {
                var onePageNav = function () {
                    element.onePageNav({
                        currentClass: 'current',
                        changeHash: false,
                        scrollSpeed: 750,
                        scrollThreshold: 0.5,
                        filter: '',
                        easing: 'swing',
                        scrollOffset: 300,
                        begin: function() {

                        },
                        end: function() {

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