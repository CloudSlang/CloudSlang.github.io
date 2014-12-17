'use strict';

angular.module('scoreWebsiteApp')
    .controller('MainCtrl', function ($rootScope, MessagesService) {

        $rootScope.sections = [
            { id: 'gettingStarted', title: $rootScope.messages.navGettingStartedTitle  },
            { id: 'useCases', title: $rootScope.messages.navUseCasesTitle },
            { id: 'about', title: $rootScope.messages.navAboutTitle },
            { id: 'documentation', title: $rootScope.messages.navDocumentationTitle  }
        ];
    }).directive('loadingPage', [function () {
        return {
            restrict: 'E',
            template: '<div class="loading-page"></div>',
            link: function () {
                Pace.on("done", function () {
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
