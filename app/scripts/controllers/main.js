'use strict';

angular.module('scoreWebsiteApp')
    .controller('MainCtrl', function ($rootScope) {

        // App labels
        $rootScope.messages = {
            // nav bar
            navGettingStartedTitle: 'Getting Started',
            navUseCasesTitle: 'Use cases',
            navAboutTitle: 'About Us',
            navContactUsTitle: 'Contact Us',

            // header
            headerMainTitle: 'Process-based, lightweight, Multi-Lingual open-source orchestration engine',
            headerDescription: 'score is a generic java-based open-source orchestration engine which is process-based, ' +
                'embeddable, lightweight, scalable and multi-lingual',
            headerStartNow: 'Start Now',

            // footer
            footerPrivacy: 'Privacy',
            footerDocumentation: 'Documentation',
            footerTerms: 'Terms',
            footerContribute: 'Contribute',
            footerScoreTeam: 'score team',

            // bullets
            mainBulletsProcessBasedTitle: 'Process based',
            mainBulletsMultiLingualTitle: 'Multi-lingual',
            mainBulletsLightweightTitle: 'Lightweight',
            mainBulletsProcessBasedDesc: 'The score language (slang) is an intuitive language to describe workflows in a re-usable fashion that can run using both the score library or the score CLI.',
            mainBulletsMultiLingualDesc: 'Small footprint, ootb content and an easy-to-embed approach makes score the perfect choice as the  workflow orchestration solution in your application.',
            mainBulletsLightweightDesc: 'Designed to support multiple compilers that can generate low level execution instructions, score serves as an orchestration platform for potentially any process language out there.',

            // contact us
            contactUsHeader: 'You\'d like to reach out to us? Drop us a message!',
            contactSuccess: 'Your message was sent successfully. Thanks!',
            contactFailure: 'Please fill out all the fields in the form.',
            contactSendButton: 'Send Message',
            contactPlaceholderName: 'Your Name',
            contactPlaceholderEmail: 'Your Email',
            contactPlaceholderSubject: 'Subject',
            contactPlaceholderMessage: 'Your Message',

            // about us
            aboutUsWhoWeAreText: 'The Eclipse Foundation project \'score\' was contributed to the open source community by the HP Software engineers to create a collaborative effort by the community ti create the best orchestration technology.',

            // use cases
            useCasesTitle: 'Powered with score',
            useCasesCsa: 'Cloud Service Automation',
            useCasesCodar: 'Project CODAR',
            useCasesOO: 'Operations Orchestration',
            useCasesCsaDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            useCasesCodarDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
            useCasesOODesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',

            // getting started
            downloadCliHeader: 'Download and use score command-line',
            downloadCliDownloadLink: 'Download and see how',
            embedScoreHeader: 'Embed score in your application',
            embedScoreLink: 'Press to see how',
            orText: 'or',
            // -- download and install sli
            detailedDownloadCliHeader: 'Download score command-line',
            detailedDownloadCliText: 'Download and Unzip score command-line',
            detailedDownloadLatest: 'Download latest version',
            detailedDownloadOldVersions: 'Download old versions',
            detailedSlangCliHeader: 'Use slang',
            detailedSlangCliText: 'Write a flow with slang',
            detailedUseCliHeader: 'Start score command-line',
            detailedUseCliText: 'Open your console and execute score cli',
            detailedTriggerFlowHeader: 'Trigger flow',
            detailedTriggerFlowText: 'Trigger your slang written flow from score command-line',
            detailedCliHeader: 'console',
            detailedCliPrefix: '$',
            detailedCliClear: 'Clear',
            detailedCliOpenScore: 'java -jar score-cli.jar^1000\nHi I\'m score!!\n>',
            detailedCliTriggerFlow: 'score trigger-flow\n^1000Flow triggered successfully^1200\nthe weather in Tel Aviv is: Hot\n$',
            // -- embed score
            detailedEmbedPomHeader: 'Score dependencies',
            detailedEmbedPomText: 'Add score dependencies to your pom.xml',
            detailedEmbedSpringHeader: 'Spring configuration',
            detailedEmbedSpringText: 'Add some score configuration to your Spring application context xml',
            detailedEmbedScoreApiHeader: 'Use score API',
            detailedEmbedScoreApiText: 'Call score APIs from your Java application (Trigger example)',
            detailedEmbedScoreApiMore: 'Press here for more score APIs',
            detailedEmbedScoreCompileHeader: 'Compile',
            detailedEmbedScoreCompileText: 'Compile your application and create an executable jar using maven',
            detailedEmbedCompileCli: 'mvn clean install^1000\n[INFO] Scanning for projects...\n ......\n[INFO] BUILD SUCCESS\n$',
            detailedEmbedScoreRunHeader: 'Run',
            detailedEmbedScoreRunText: 'Run your application from command line',
            detailedEmbedRunCli: 'cd /dev/score-app/target\n$ java -jar sample-app.jar\n^1000\nChecking flow status...^1200\nFinished^1000\nthe weather in Tel Aviv is: Hot\n$'
        };

        $rootScope.sections = [
            { id: 'gettingStarted', title: $rootScope.messages.navGettingStartedTitle  },
            { id: 'useCases', title: $rootScope.messages.navUseCasesTitle },
            { id: 'about', title: $rootScope.messages.navAboutTitle },
            { id: 'contactUs', title: $rootScope.messages.navContactUsTitle  }
        ];

        $rootScope.year = new Date().getFullYear();
    });