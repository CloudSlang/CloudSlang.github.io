'use strict';

angular.module('scoreWebsiteApp')
    .controller('MainCtrl', function ($rootScope) {

        // App labels
        $rootScope.messages = {
            // nav bar
            navAboutTitle: 'Who are we?',
            navDownloadTitle: 'Download',
            navUseCasesTitle: 'Use cases',
            navContactUsTitle: 'Contact Us',

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
            footerHowToBuy: 'How To Buy',
            footerStatus: 'Status',
            footerScoreTeam: 'score Team',

            // bullets
            mainBulletsContentTitle: 'Content',
            mainBulletsMultiLingualTitle: 'Multi-lingual',
            mainBulletsLightweightTitle: 'Lightweight',
            mainBulletsContentDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            mainBulletsMultiLingualDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            mainBulletsLightweightDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
        };

        $rootScope.sections = [
            { id: 'about', title: $rootScope.messages.navAboutTitle },
            { id: 'download', title: $rootScope.messages.navDownloadTitle  },
            { id: 'useCases', title: $rootScope.messages.navUseCasesTitle  },
            { id: 'contactUs', title: $rootScope.messages.navContactUsTitle  }
        ];

        $rootScope.year = new Date().getFullYear();
    });