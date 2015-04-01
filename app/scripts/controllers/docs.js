'use strict';

angular.module('scoreWebsiteApp')
    .controller('DocsCtrl', function ($rootScope, MessagesService, $location, $timeout) {

        $timeout(function() {
            if ($location.hash()) {
                var aTag = $('#' +  $location.hash());
                if (aTag) {
                    $('html, body').animate({scrollTop: aTag.offset().top}, 400, 'swing');
                }
            }
        }, 1000);

        _.forEach($('.navbar-collapse'), function(target) {
            $(target).collapse({'toggle': false});
        });

        $rootScope.sections = [
            { id: 'overview', title: $rootScope.messages.navDocsScoreTitle },
            { id: 'slang', title: $rootScope.messages.navDocsSlangTitle },
            { id: 'developer', title: $rootScope.messages.navDocsDeveloperTitle }
        ];
        $rootScope.navSwitch = { uri: '', title: $rootScope.messages.navBackToSiteTitle };
    });
