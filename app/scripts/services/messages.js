'use strict';

angular.module('scoreWebsiteApp')
    .factory('MessagesService', function ($rootScope) {

        // App labels
        $rootScope.messages = {
            // nav bar
            navGettingStartedTitle: 'Getting Started',
            navUseCasesTitle: 'Use Cases',
            navAboutTitle: 'About Us',
            //navContactUsTitle: 'Contact Us',
            navDocumentationTitle: 'Documentation',

            //docs nav bar
            navDocsScoreTitle: 'Score',
            navDocsSlangTitle: 'Slang',
            navDocsDeveloperTitle: 'Developer',
            navDocsBackToSiteTitle: 'Back To Site',

            // header
            headerMainTitle: 'Process-based, lightweight, Multi-Lingual open-source orchestration engine',
            headerDescription: 'score is a general-purpose java-based open-source orchestration engine which is process-based, ' +
                'embeddable, lightweight, scalable and multi-lingual',
            headerStartNow: 'Start Now',

            // footer
            footerPrivacy: 'Privacy Policy',
            footerTerms: 'Terms of Use',
            footerCopyrightAgent: 'Copyright Agent',
            footerLegal: 'Legal',
            footerContactUs: 'Contact Us',
            footerContribute: 'Contribute',

            // bullets
            mainBulletsProcessBasedTitle: 'Process based',
            mainBulletsMultiLingualTitle: 'Multilingual',
            mainBulletsLightweightTitle: 'Lightweight',
            mainBulletsProcessBasedDesc: 'Score DSL – slang - is a simple, intuitive way to describe workflows in a re-usable fashion. slang allows you to define the ‘how’ and not just the ‘what’, thus allowing you to better control the actual runtime behavior of the workflow.',
            mainBulletsMultiLingualDesc: 'slang is only one of the languages you can use to define workflows for score. Take advantage of score pluggable architecture to plug in your compiler to potentially support any process modeling language out there.',
            mainBulletsLightweightDesc: 'Small footprint, out of the box content and an easy-to-embed approach makes score the perfect choice as the  workflow orchestration solution in your application.',
            mainBulletsReadMore: 'Read More',

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
            aboutUsWhoWeAreText: 'The Eclipse Foundation™ project score was contributed to the open source community by HP Software engineers with the goal of leveraging the power of community to create the best-in-class orchestration technology.',

            // use cases
            useCasesTitle: 'Use Cases',
            useCasesITTitle: 'IT Process Automation',
            useCasesCloudTitle: 'Cloud Orchestration',
            useCasesAppDeploymentTitle: 'Application Deployment',
            useCasesDevOpsTitle: 'DevOps',
            useCasesITDesc: 'Disaster Recovery',
            useCasesCloudDesc: 'OpenStack Health Check',
            useCasesAppDeploymentDesc: 'Link Docker Container',
            useCasesDevOpsDesc: 'CI \\ CD',

            // getting started
            downloadCliHeader: 'Download and use score CLI tool',
            downloadCliDownloadLink: 'Download and see how',
            embedScoreHeader: 'Embed score library in your application',
            embedScoreLink: 'Press to see how',
            orText: 'or',

            // -- download and install cli
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
            detailedCliTriggerFlow: 'score trigger\n^1200the weather in San Fransisco is: Hot\n$',
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
            detailedEmbedRunCli: 'cd /dev/score-app/target\n$ java -jar sample-app.jar\n^1000Checking flow status...^1200\nFinished^1000\nthe weather in San Fransisco is: Hot\n$'
        };

        $rootScope.year = new Date().getFullYear();

    });