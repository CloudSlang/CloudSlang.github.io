'use strict';

angular.module('scoreWebsiteApp')
    .controller('MainCtrl', function ($rootScope) {

        // App labels
        $rootScope.messages = {
            // nav bar
            navGettingStartedTitle: 'Getting Started',
            navAboutTitle: 'About Us',
            navUseCasesTitle: 'Use cases',
            navContactUsTitle: 'Contact Us',

            // header
            headerMainTitle1: 'Process-based, lightweight, scalable',
            headerMainTitle2: 'open-source orchestration engine',
            headerDescription: 'score is a java-based open-source generic orchestration engine which is process-based, ' +
                'embeddable, lightweight, scalable and multi-lingual',
            headerStartNow: 'Start Now',

            // footer
            footerPrivacy: 'Privacy',
            footerDocumentation: 'Documentation',
            footerTerms: 'Terms',
            footerContribute: 'Contribute',
            footerScoreTeam: 'score team',

            // bullets
            mainBulletsContentTitle: 'Content',
            mainBulletsMultiLingualTitle: 'Multi-lingual',
            mainBulletsLightweightTitle: 'Lightweight',
            mainBulletsContentDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            mainBulletsMultiLingualDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            mainBulletsLightweightDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',

            // contact us
            contactUsHeader: 'You\'d like to reach out to us? Drop us a message!',
            contactSuccess: 'Your message was sent successfully. Thanks!',
            contactFailure: 'Please fill out all the fields in the form.',
            contactSendButton: 'Send Message',

            // about us
            aboutUsWhoWeAreText: 'HP Operations Orchestration R&D team re-wrote 10.x version, starting 2011. We believe we have a very good orchestration technology, that we want to contribute to the open source developers community. We started the effort of score at 2014.',

            // use cases
            useCasesTitle: 'Powered with score',
            useCasesCsa: 'Cloud Service Automation',
            useCasesCodar: 'Project CODAR',
            useCasesOO: 'Operations Orchestration',
            useCasesCsaDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            useCasesCodarDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            useCasesOODesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.'
        };

        $rootScope.sections = [
            { id: 'gettingStarted', title: $rootScope.messages.navGettingStartedTitle  },
            { id: 'about', title: $rootScope.messages.navAboutTitle },
            { id: 'useCases', title: $rootScope.messages.navUseCasesTitle },
            { id: 'contactUs', title: $rootScope.messages.navContactUsTitle  }
        ];

        $rootScope.year = new Date().getFullYear();
    });