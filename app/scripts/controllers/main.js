'use strict';

angular.module('scoreWebsiteApp')
    .controller('MainCtrl', function ($rootScope) {

        // App labels
        $rootScope.messages = {
            // nav bar
            navAboutTitle: 'Who are we?',
            navDownloadTitle: 'Download',
            navUseCasesTitle: 'Use cases',

            // header
            headerMainTitle1: 'Process-based, lightweight, scalable',
            headerMainTitle2: 'open-source orchestration engine',
            headerDescription: 'score is a java-based open-source generic orchestration engine which is process-based, ' +
                'embeddable, lightweight, scalable and multi-lingual',
            headerStartNow: 'Start Now',

            // footer
            footerAboutTitle: 'About Us',
            footerDocumentationTitle: 'Documentation',
            footerUseCasesTitle: 'Use Cases',
            footerTeam: 'Team',
            footerNews: 'News',
            footerContact: 'Contact',
            footerOnlineTutorial: 'Online Tutorial',
            footerHowToBuy: 'Hot To Buy',
            footerStatus: 'Status',
            footerScoreTeam: 'Score Team'
        };

        $rootScope.sections = [
            { id: 'about', title: $rootScope.messages.navAboutTitle },
            { id: 'download', title: $rootScope.messages.navDownloadTitle  },
            { id: 'useCases', title: $rootScope.messages.navUseCasesTitle  }
        ];

        $rootScope.year = new Date().getFullYear();
    });