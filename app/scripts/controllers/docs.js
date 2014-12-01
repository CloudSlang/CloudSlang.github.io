'use strict';

angular.module('scoreWebsiteApp')
    .controller('DocsCtrl', function ($rootScope, MessagesService, $location){

        if ($location.hash()){
            var aTag = $("#"+ $location.hash());
            if (!_.isEmpty(aTag)) {
                $('html,body').animate({scrollTop: aTag.offset().top}, 'slow');
            }
        }

        _.forEach($('.navbar-collapse'), function(target) {
            $(target).collapse({'toggle': false});
        });

        $rootScope.sections = [
            { id: 'score', title: $rootScope.messages.navDocsScoreTitle },
            { id: 'slang', title: $rootScope.messages.navDocsSlangTitle },
            { id: 'developer', title: $rootScope.messages.navDocsDeveloperTitle },
            { id: 'back_to_site', title: $rootScope.messages.navDocsBackToSiteTitle }
        ];
    });
