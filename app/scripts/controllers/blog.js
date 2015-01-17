'use strict';

angular.module('scoreWebsiteApp')
    .controller('BlogCtrl', function ($rootScope, MessagesService) {
        _.forEach($('.navbar-collapse'), function(target) {
            $(target).collapse({'toggle': false});
        });

        $rootScope.sections = [];
        $rootScope.navSwitch = { uri: '', title: $rootScope.messages.navBackToSiteTitle };
    });
