'use strict';

angular.module('scoreWebsiteApp')
    .factory('MessagesService', function ($rootScope) {
        var small = $(window).width() < 482;
        var verySmall = $(window).width() < 384;
        var headerMainTitleBullets = small ?
            verySmall ? ['^2500Heavy-weight', 'Lightweight,^1300\nprocess-based^300\norchestration\nengine'] :
                ['^2500Heavy-weight', 'Lightweight,^1300\nprocess-based^300\norchestration engine'] :
            ['^2500Heavy-weight', 'Lightweight,^1300 process-based^300\norchestration engine'];
        // App labels
        $rootScope.messages = {
            // nav bar
            navGettingStartedTitle: 'Getting Started',
            navUseCasesTitle: 'Use Cases',
            navAboutTitle: 'About Us',
            navDocumentationTitle: 'Documentation',
            navBlogTitle: 'Blog',
            navBackToSiteTitle: 'Back To Site',

            //docs nav bar
            navDocsScoreTitle: 'Score',
            navDocsSlangTitle: 'Slang',
            navDocsDeveloperTitle: 'Developer',

            // header
            headerMainTitle: 'Lightweight, process-based orchestration engine',
            headerMainTitleBullets: headerMainTitleBullets,
            headerDescription: 'score is a general-purpose java-based open-source orchestration engine which is process-based, ' +
                'embeddable, lightweight, scalable and multilingual',
            headerStartNow: 'Start Now',

            // footer
            footerPrivacy: 'Privacy Policy',
            footerTerms: 'Terms of Use',
            footerLicense: 'Code licensed under the ',
            footerLicenseHref: 'Apache License, Version 2.0.',
            footerContactUs: 'Contact Us',
            footerGooglePlus: 'Google Plus',
            footerYoutube: 'YouTube',
            footerTwitter: 'Twitter',
            footerGitHub: 'GitHub',
            footerContribute: 'Contribute',

            // bullets
            mainBulletsProcessBasedTitle: 'Process based',
            mainBulletsMultiLingualTitle: 'Multilingual',
            mainBulletsLightweightTitle: 'Lightweight',
            mainBulletsProcessBasedDesc: 'score DSL – slang - is a simple, intuitive way to describe workflows in a re-usable fashion. slang allows you to define the ‘how’ and not just the ‘what’, thus allowing you to better control the actual runtime behavior of the workflow.',
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
            aboutUsWhoWeAreText: 'The project score was contributed to the open source community by HP Software engineers with the goal of leveraging the power of community to create the best-in-class orchestration technology.',

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
            downloadCliHeader: 'Download and use slang CLI tool',
            downloadCliDownloadLink: 'Download and see how',
            embedScoreHeader: 'Embed score library in your application',
            embedScoreLink: 'Press to see how',
            orText: 'or',

            // -- download and install cli
            detailedDownloadCliHeader: 'Download slang command-line',
            detailedDownloadCliText: 'Download and Unzip slang command-line',
            detailedDownloadLatest: 'Download latest version',
            detailedDownloadOldVersions: 'Download old versions',
            detailedSlangCliHeader: 'Use slang',
            detailedSlangCliText: 'Write a flow with slang using your favorite text editor and save it as YAML file',
            detailedUseCliHeader: 'Start slang command-line',
            detailedUseCliText: 'Open your console and execute slang cli',
            detailedTriggerFlowHeader: 'Trigger flow',
            detailedTriggerFlowText1: '1. Open your console and execute slang cli. The cli is located at <path>/slang/appassembler/bin.',
            detailedTriggerFlowText2: '2. Trigger your slang written flow from slang command-line',
            detailedCliHeader: 'console',
            detailedCliPrefix: '$',
            detailedCliClear: 'Clear',
            detailedCliOpenScore: 'java -jar score-cli.jar^1000\nHi I\'m score!!\n>',
            detailedCliTriggerFlow: 'slang run --f /.../SimpleFlow.sl --i input1=LA\n' +
                '^500 CheckWeather\n' +
                '^250 PrintWeather\n' +
                ' the weather in LA is: hot\n' +
                '^250 Flow : SimpleFlow finished with result: SUCCESS\n' +
                '^250$',

            // -- embed score
            detailedEmbedPomHeader: 'score dependencies',
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
            detailedEmbedRunCli: 'cd /dev/score-app/target\n' +
                '$ java -jar sample-app.jar\n' +
                '^500 CheckWeather\n' +
                '^250 PrintWeather\n' +
                ' the weather in LA is: hot\n' +
                '^250 Flow : SimpleFlow finished with result: SUCCESS\n' +
                '^250$'
        };

        $rootScope.year = new Date().getFullYear();

    });
