'use strict';

angular.module('scoreWebsiteApp')
    .controller('MainCtrl', function ($rootScope, MessagesService) {

        $rootScope.sections = [
            { id: 'gettingStarted', title: $rootScope.messages.navGettingStartedTitle  },
            { id: 'useCases', title: $rootScope.messages.navUseCasesTitle },
            { id: 'about', title: $rootScope.messages.navAboutTitle },
            { id: 'documentation', title: $rootScope.messages.navDocumentationTitle  }
        ];
    });
