'use strict';

angular.module('cloudSlangWebsiteApp')
    .controller('MainCtrl', function ($scope, $rootScope, $document, MessagesService) {

        $rootScope.sections = [
            {id: 'useCases', title: $rootScope.messages.navUseCasesTitle},
            {id: 'suggestWorkflow', title: $rootScope.messages.navSuggestAFlow},
            {id: 'gettingStarted', title: $rootScope.messages.navGettingStartedTitle},
            {id: 'about', title: $rootScope.messages.navAboutTitle},


        ];

        $rootScope.showCli = function (elemendId, commands, loop, typeSpeed) {
            $('#' + elemendId + '-cursor').empty();
            $('#' + elemendId).typed({
                strings: commands,
                typeSpeed: typeSpeed || 30,
                loop: loop || false,
                backSpeed: -20
            });
        };

        _.forEach($('.navbar-collapse'), function (target) {
            $(target).collapse({'toggle': false});
        });

        // hide menu bar on click (small resolutions)
        $document.on('click.nav', '.navbar-collapse.in', function () {
            _.forEach($('.navbar-collapse'), function (target) {
                $(target).collapse('hide');
            });
        });

        // workaround to remove the current class from the navbar when reaching the header
        $(window).scroll(function () {
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
            $rootScope.animateToElement($rootScope.sections[2].id);
        };

    }).directive('slickSlider',function($timeout){
        return {
            restrict: 'A',
            link: function(scope,element,attrs) {
                $timeout(function() {
                    $(element).slick(scope.$eval(attrs.slickSlider));
                });
            }
        };
}).directive('loadingPage', [function () {
        return {
            restrict: 'E',
            template: '<div class="loading-page"></div>',
            link: function () {
                Pace.on('done', function () {
                    $('div.loading-page').fadeOut('slow');
                });
            }
        };
    }]).directive('youtubeEmbed', [function () {
        return {
            restrict: 'A',
            template: '',
            link: function (scope, element) {
                var src = $(element).find('img')[0].src;
                optimizeYouTubeEmbeds(src);
            }
        };
    }]);
