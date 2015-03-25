'use strict';

angular.module('scoreWebsiteApp')
    .factory('MessagesService', function ($rootScope) {
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
            navDocsScoreTitle: 'Overview',
            navDocsSlangTitle: 'Slang',
            navDocsDeveloperTitle: 'Developer',

            // header
            headerMainTitle: 'Flow-based orchestration engine to manage deployed applications',
            headerDescription: 'Allows you to rapidly automate your DevOps use cases using ready-made workflows.',
            headerStartNow: 'Getting started',

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
            mainBulletsProcessBasedTitle: 'Process-Based',
            mainBulletsDayTwoOperationsTitle: 'Day 2 Operations',
            mainBulletsAgentlessTitle: 'Agentless',
            mainBulletsProcessBasedDesc: 'CloudSlang is a simple way to describe workflows in a reusable fashion. Using YAML and Python, CloudSlang allows you to better control the workflow\'s behavior.',
            mainBulletsDayTwoOperationsDescPre: 'Use existing CloudSlang content to manage your deployed application.',
            mainBulletsDayTwoOperationsDescLink: 'Explore',
            mainBulletsDayTwoOperationsDescPost: ' our Docker, OpenStack and utilities content.',
            mainBulletsAgentlessDesc: 'Don’t bother setting up and managing agents on all your machines. CloudSlang workflows can use remote APIs to run tasks.',
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
            aboutUsWhoWeAreText: 'This project is being contributed to the open source community by HP Software engineers with the goal of leveraging the power of community to create the best-in-class orchestration technology.',

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
            detailedDownloadCliHeader: 'Download',
            detailedDownloadCliText: 'Download and unzip the command-line interface.',
            detailedDownloadLatest: 'Download latest version',
            detailedDownloadOldVersions: 'Download old versions',
            detailedSlangCliHeader: 'Write',
            detailedSlangWriteFlowText: 'Write a flow and save it as \'hello_world.sl\'.',
            detailedSlangWriteOperationText: 'Write an operation and save it as \'print.sl\'.',
            detailedUseCliHeader: 'Start command-line interface',
            detailedUseCliText: 'Open your console and execute the CLI',
            detailedTriggerFlowHeader: 'Run',
            detailedTriggerFlowText1: '1. Open your console and execute the CLI. The CLI is located at <path>/cslang/bin.',
            detailedTriggerFlowText2: '2. Run your flow from the command-line.',
            detailedCliHeader: 'Click to see how',
            detailedCliPrefix: '$',
            detailedCliClear: 'Clear',
            detailedCliTriggerFlow: 'cslang\n' +
                '^100cslang>^500 run --f .../hello_world.sl\n' +
                '^500- sayHi\n' +
                '^250Hello, World\n' +
                '^250Flow : hello_world finished with result : SUCCESS\n' +
                'Execution id: 101600001, duration: 0:00:00.790\n' +
                '^250cslang>',

            // -- embed score
            detailedEmbedPomHeader: 'score dependencies',
            detailedEmbedPomText: 'Add score dependencies to your pom.xml',
            detailedEmbedSpringHeader: 'Spring configuration',
            detailedEmbedSpringText: 'Add some score configuration to your Spring application context xml',
            detailedEmbedScoreApiHeader: 'Use score API',
            detailedEmbedScoreApiText: 'Call score APIs from your Java application (Trigger example)',
            detailedEmbedScoreApiMore: 'Press here for more score APIs',
            detailedEmbedScoreCompileHeader: 'Compile & Run',
            detailedEmbedScoreCompileText: 'Compile your application and create an executable jar using maven and run',
//            detailedEmbedCompileCli: 'mvn clean install^1000\n[INFO] Scanning for projects...\n ......\n[INFO] BUILD SUCCESS\n$',
//            detailedEmbedScoreRunHeader: 'Run',
//            detailedEmbedScoreRunText: 'Run your application from command line',
//            detailedEmbedRunCli: 'cd /dev/score-app/target\n' +
//                '$ java -jar sample-app.jar\n' +
//                '^500 CheckWeather\n' +
//                '^250 PrintWeather\n' +
//                ' the weather in LA is: hot\n' +
//                '^250 Flow : SimpleFlow finished with result: SUCCESS\n' +
//                '^250$'
            goAheadAndTry: 'Go ahead and try',
            goAheadAndTryLink: 'https://github.com/meirwah/test-slang-embedded',
            goAheadAndTryLinkMessage: 'Example project'
        };

        $rootScope.year = new Date().getFullYear();

    });
