'use strict';

angular.module('scoreWebsiteApp')
    .controller('HeaderCtrl', function ($scope, $window) {
        $scope.goHome = function () {
            $window.location.reload();
            $window.scrollTo(0, 0);
        };

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
    }]);