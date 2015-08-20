'use strict';

angular.module('cloudSlangWebsiteApp')
    .controller('MainCtrl', function ($scope, $rootScope, $document, MessagesService) {

        $rootScope.sections = [
            {id: 'useCases', title: $rootScope.messages.navUseCasesTitle},
            {id: 'suggestWorkflow', title: $rootScope.messages.navSuggestAFlow},
            {id: 'gettingStarted', title: $rootScope.messages.navGettingStartedTitle},
            {id: 'about', title: $rootScope.messages.navAboutTitle},


        ];

        _.forEach($('.navbar-collapse'), function (target) {
            $(target).collapse({'toggle': false});
        });

        // hide menu bar on click (small resolutions)
        $document.on('click.nav', '.navbar-collapse.in', function () {
            _.forEach($('.navbar-collapse'), function (target) {
                $(target).collapse('hide');
            });
        });

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
