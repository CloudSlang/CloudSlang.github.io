'use strict';

angular.module('cloudSlangWebsiteApp')
    .factory('MessagesService', function ($rootScope) {
        // App labels
        $rootScope.messages = {
            // nav bar
            navGettingStartedTitle: 'Get Started',
            navUseCasesTitle: 'Use Cases',
            navAboutTitle: 'About Us',
            navDocumentationTitle: 'Documentation',
            navBlogTitle: 'Blog',
            navCommunityTitle: 'Community',
            navBackToSiteTitle: 'Back To Site',
            navSuggestAFlow: 'Suggest a Flow',

            //docs nav bar
            navDocsOverviewTitle: 'Overview',
            navDocsSlangTitle: 'CloudSlang',
            navDocsDeveloperTitle: 'Developer',

            // header
            headerMainTitle: 'Automate your DevOps use cases using ready-made workflows',
            headerDescription: 'With CloudSlang you can orchestrate popular DevOps technologies, such as Docker and CoreOS in an agentless manner. ' +
                                    'You can also define custom workflows that are reusable, shareable and easy to understand.',
            headerStartNow: 'Start Now',
            worksWith: 'Works with:',

            // what is cloudslang
            whatIsTitle: 'What is CloudSlang?' ,
            whatIsDescription: 'CloudSlang is an open source tool for orchestrating popular DevOps technologies, such as Docker and CoreOS in an agentless manner.\ ' +
                                    'Use ready-made workflows or define your own custom ones. CloudSlang workflows are reusable, shareable and easy to understand.',
            whatIsDescription2: 'The CloudSlang project is composed of three main parts: the CloudSlang Orchestration Engine,'+
                                    ' the YAML-based CloudSlang language and the ready-made CloudSlang content.' ,

            //suggest a workflow
            suggestWorkFlowTitle: 'Suggest a Workflow',
            suggestWorkFlowDescription1: 'Do you have a DevOps use case that you\'d like to automate, but it\'s not covered by our ready-made content?',
            suggestWorkFlowDescription2: 'We’d be thrilled if you would contribute and share your own content. In the meantime though, you can click below to let the community know what you need.',
            suggestWorkFlowButton: 'Suggest a workflow' ,

            // footer
            footerPrivacy: 'Privacy Policy',
            footerTerms: 'Terms of Use',
            footerLicense: 'License',
            footerLicenseHref: 'Apache License, Version 2.0.',
            footerContactUs: 'Contact Us',
            footerGooglePlus: 'Google Plus',
            footerYoutube: 'YouTube',
            footerTwitter: 'Twitter',
            footerGitHub: 'GitHub',
            footerContribute: 'Contributing',
            footerRoadMap: 'Project Roadmap',
            footerGoogleGroups: 'Mailing List',
            footerBlog: 'Blog',
            footerDocs: 'Docs',
            footerTutorials: 'Tutorials',

            // bullets
            whyCloudSlangTitle: 'Why CloudSlang?' ,
            mainBulletsProcessBasedTitle: 'Process-Based',
            mainBulletsReadyMadeContentTitle: 'Ready-made Content',
            mainBulletsAgentlessTitle: 'Agentless',
            mainBulletsProcessBasedDesc: 'Many popular orchestration solutions are based on desired state modelling. ' +
                                            'This approach usually forces you to relinquish control over the runtime behavior of your orchestration and is mostly used for static cases like deployment. ' +
                                                'CloudSlang takes a process-based approach to orchestration, allowing you to define how your orchestration works and empowering you to also address dynamic cases such as health checks, remediation, and disaster recovery.',
            mainBulletReadyMadeContentDesc: 'Although writing your own CloudSlang content is easy using our YAML-based DSL, you don’t need to write a single line of code to leverage the power of CloudSlang.' +
                                                    ' There is a growing repository of ready-made content that integrates with many of today’s hottest technologies, such as Docker and CoreOS. ' +
                                                            'And, the open source nature of the project means that you’ll be able to reuse and repurpose content shared by the community.',
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
            aboutUsByHp: 'Project CloudSlang by HP',
            aboutUsWhoWeAreText: 'This project is being contributed to the open source community by HP Software engineers with the goal of leveraging the power of community to create the best-in-class orchestration technology.',

            // use cases
            useCasesTitle: 'Example Use Cases',
            useCasesCoreOsTitle: 'Clear Unused Docker Images in a CoreOS Cluster',
            useCasesCloudTitle: 'Cloud Orchestration',
            useCasesAppDeploymentTitle: 'Deploying a Dockerized Application',
            useCasesOpenStackTitle: 'OpenStack Health Check',
            useCasesCoreOsDesc: 'Unused Docker images can waste a lot of precious disk space. Use this workflow to remove all the unused Docker images from your entire CoreOS cluster.',
            useCasesCloudDesc: 'OpenStack Health Check',
            useCasesAppDeploymentDesc: 'This example workflow demonstrates how to easily deploy a complex app that uses linked containers. ' +
                                            'Use it as a springboard for writing a custom flow to deploy your own application.',
            useCasesOpenStackDesc: 'Performs a health check on an OpenStack machine by creating a server, checking that it\'s up and then deleting it.',

            // getting started
            downloadCliHeader: 'Download and use slang CLI tool',
            downloadCliDownloadLink: 'Download and see how',
            embedScoreHeader: 'Embed score library in your application',
            embedScoreLink: 'Press to see how',
            orText: 'or',

            // download popup
            popUpHeader: 'Thanks for downloading the CloudSlang CLI' ,
            popUpBody: 'For more information on getting started with CloudSlang check out the',
            videoLink: 'introductory video',
            comma: ', ',
            docsLink: 'docs',
            popUpBody2: 'or the ',
            tutorialLink: 'tutorial',
            dot: '.',
            emailField: 'Keep up to date with new ready-made flows and language capabilities. Sign up for the CloudSlang newsletter.',
            emailPrivacy:'We respect your privacy. ' +
                            'Your email address will only be used for communication purposes. It will not be sold, shared with or disclosed to a third party.',


            // -- download and install cli
            detailedDownloadCliHeader: 'Download',
            detailedDownloadCliText: '1. Download and unzip the CloudSlang CLI.',
            detailedDownloadLatest: 'Download latest version',
            detailedDownloadOldVersions: 'Download old versions',
            detailedSlangCliHeader: 'Execute CLI',
            detailedSlangWriteFlowText: '2. Go to cslang-cli\cslang\cslang\bin\ and run the CloudSlang executable.',
            detailedSlangWriteOperationText: 'Write an operation and save it as \'print.sl\'.',
            detailedUseCliHeader: 'Start command-line interface',
            detailedUseCliText: 'Open your console and execute the CLI',
            detailedTriggerFlowHeader: 'Run a workflow',
            detailedTriggerFlowText1: '3. At the prompt enter:',
            detailedTriggerFlowText2: 'run --f ../../content/io/cloudslang/base/print/print_text.sl --i text=Hi',
            detailedTriggerFlowText3: 'The CLI will run the ready-made print_text operation that will print the value passed to the variable text.',
            detailedLearnMoreHeader: 'Learn More',
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
