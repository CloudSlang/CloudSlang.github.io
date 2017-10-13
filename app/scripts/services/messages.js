'use strict';

angular.module('cloudSlangWebsiteApp')
    .factory('MessagesService', function ($rootScope) {
        // App labels
        $rootScope.messages = {
            // nav bar
            navGettingStartedTitle: 'Get Started',
            navUseCasesTitle: 'Use Cases',
            navAboutTitle: 'Contributors',
            navDocumentationTitle: 'Documentation',
            navBlogTitle: 'Blog',
            navCommunityTitle: 'Community',
            navBackToSiteTitle: 'Back To Site',
            navSuggestAFlow: 'Suggest a Flow',
            navNewsletter: 'Subscribe',

            // header
            //headerMainTitle: 'Automate your development and operations using ready-made workflows',
            headerMainTitle: 'Open-source orchestration',
			headerSubTitle: 'Ready-made workflows',
			//headerSubTitleShort: 'Orchestrate today, share tomorrow',
			headerDescription: 'CloudSlang is an open source tool for orchestrating cutting edge technologies. It can orchestrate anything you can imagine in an agentless manner.\ ' +
                                    'You can use or customize ready-made YAML based workflows. They are powerful, shareable and human readable. Modernize your IT with CloudSlang.',
            headerStartNow: 'Start Now',
            worksWith: 'Works with:',

            // what is cloudslang
            whatIsTitle: 'What is CloudSlang?' ,
            //whatIsDescription: 'CloudSlang is an open source tool for orchestrating cutting edge technologies, such as Docker and CoreOS in an agentless manner.\ ' +
            //                        'Use ready-made workflows or define your own custom ones. CloudSlang workflows are reusable, shareable and easy to understand.',
			whatIsDescription: 'CloudSlang is an open source tool for orchestrating cutting edge technologies. It can orchestrate anything you can imagine in an agentless manner.\ ' +
                                    'You can use or customize ready-made YAML based workflows. They are powerful, shareable and human readable. Modernize your IT with CloudSlang.',
            whatIsDescription2: 'The CloudSlang project is composed of three main parts: the CloudSlang Orchestration Engine,'+
                                    ' the YAML-based CloudSlang language and the ready-made CloudSlang content.' ,



            //community
            communityTitle: 'Community',
            communityTitleDesc1:'Get involved. The CloudSlang project is completely open source. The code, discussions and roadmap are all out in the open on GitHub. ',
            communityTitleDesc2: 'Join us in leveraging the power of the community to create the best-in-class orchestration technology.',
            communityCommunicate: 'Communicate',
            communityCommunicateDesc: 'See what we\'re working on.' +
                                            ' Or tell us what you\'re working on.',
            communityContribute:'Contribute',
            communityContributeDesc:'Share one of your own workflows, open as issue or fix a bug.',
            communityLearnMore:'Learn More',
            communityLearnMoreDesc:'Read the docs, work your way through a tutorial or read our blog.',




            //suggest a workflow
            suggestWorkFlowTitle: 'Suggest a Workflow',
            suggestWorkFlowDescription1: 'Do you have a use case that you\'d like to automate, but it\'s not covered by our ready-made content?',
            suggestWorkFlowDescription2: 'We’d be thrilled if you would contribute and share your own content. In the meantime though, you can click below to let the community know what you need.',
            suggestWorkFlowButton: 'Suggest a workflow' ,

            // footer
            footerPrivacy: 'Privacy Policy',
            footerTerms: 'Terms of Use',
            footerLicense: 'License',
            footerLicenseHref: 'Apache License, Version 2.0.',
            footerContactUs: 'Contact Us',
            footerGooglePlus: 'Google Plus',
            footerNewsLetter: 'Subscribe to our Newsletter',
            footerYoutube: 'YouTube',
            footerTwitter: 'Twitter',
            footerGitHub: 'GitHub',
            footerContribute: 'How to Contribute',
            footerRoadMap: 'Roadmap',
            footerSlackChannel: 'Slack',
            footerBlog: 'Blogs',
            footerDocs: 'Documents',
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
            aboutUsByHp: 'Project CloudSlang by Hewlett Packard Enterprise',
            aboutUsWhoWeAreText: 'This project is being contributed to the open source community by both HPE Software engineers and individual contributors with the goal of leveraging the power of community to create the best-in-class orchestration technology.',
            aboutUsInHp: 'Individual Contributors (CloudSlang team members)',
            aboutUsNotInHp: 'Individual Contributors',

            // get started banner
            bannerTitle: 'Get Started',
            bannerDesc: 'Click this button and start using CloudSlang within minutes',
            startNowBanner: 'Start Now',


            // use cases
            useCasesTitle: 'Example Use Cases',
            useCasesCoreOsTitle: 'Clear Unused Docker Images in a CoreOS Cluster',
            useCasesMigrateContainerTitle: 'Migrating a Live Container',
            useCasesOpenStackTitle: 'OpenStack Health Check',
            useCasesCoreOsDesc: 'Unused Docker images can waste a lot of precious disk space. Use this workflow to remove all the unused Docker images from your entire CoreOS cluster.',
            useCasesMigrateContainerDesc: 'Sometimes there is a need to redistribute containers across a datacenter. Use this flow to migrate Docker containers based on the CPU load of their hosts while still preserving container state.',
            useCasesOpenStackDesc: 'Performs a health check on an OpenStack machine by creating a server, checking that it\'s up and then deleting it.',
            useCasesSeeMore: 'See the full content catalog' ,

            // getting started
            /*getStartedTitleDesc: 'Start Working with CloudSlang by following the simple steps provided below.',
             getStartedPrereq: 'Prerequisite: Java JRE version 7 or higher.',*/
            getStartedToRunTitle: 'If you want to RUN',
            getStartedToRunTitleDesc: 'Follow the 3 simple steps provided below.',
            getStartedToRunPrereq: 'Prerequisite: Java JRE version 7 or higher.',
            downloadText: 'Download',
            downloadTextZip: 'Windows',
            downloadTextRpm: 'Red Hat',
            downloadTextDeb: 'Debian',
            downloadTextDmg: 'Mac',
            downloadTextGZip: 'Linux/Mac',
            downloadTextWindows: '.zip',
            downloadTextRHEL: '.rpm',
            downloadTextDebian: '.deb',
            downloadTextMac: '.dmg',
            downloadTextMix: '.gzip',
            downloadTextMd5: 'Download .md5 files to check the .rpm and .deb packages',
            cloudSlangVersion: 'CloudSlang version 1.0.10',
            detailedDownloadCliHeader: 'Download & Run',
            detailedDownloadCliText: 'Download and unpack the CloudSlang CLI.',
            detailedDownloadCliText1: 'Go to cslang/bin/ and run the cslang executable file.',
            detailedDownloadCliText2: 'If you are using ',
            detailedDownloadCliText3: ' you can simply run our Docker image:',
            DockerRun: 'docker run -it cloudslang/cloudslang',
            detailedDownloadCliDockerImage: 'Docker image',
            detailedTriggerFlowHeader: 'Run a workflow',
            detailedTriggerFlowText1: 'At the prompt enter:',
            detailedTriggerFlowText2: 'run --f ../content/io/cloudslang/base/print/print_text.sl --i text=Hi',
            detailedTriggerFlowText4: 'The CLI will run the ready-made print_text operation that will print the value passed to the variable text.',
            detailedLearnMoreHeader: 'Learn More',

            getStartedToDevTitle: 'If you want to DEVELOP and CONTRIBUTE',
            getStartedToDevTitleDesc: 'Follow the 3 simple steps provided below.',
            getStartedToDevPrereq: 'Prerequisite: Nothing special here. You\'ll figure it out.',
            getStartedToDevForkHeader: 'Fork & Clone',
            getStartedToDevForkText: 'You can contribute on multiple repositories.',
            getStartedToDevForkText1: 'But if you want to develop your own content and eventually contribute it back you should fork our content repository.',
            getStartedToDevForkButton: 'Fork Content',
            getStartedToDevDHeader: 'Develop workflows',
            getStartedToDevDText: 'You can alter existing workflows or add new ones according to your needs.',
            getStartedToDevDText1: 'You can even write java or python based operations and reference those in your CloudSlang files.',
            getStartedToDevDText2: 'If you are working with IntelliJ IDEA or Atom you can download CloudSlang based plugins that will assist you in the development process.',
            getStartedToLearnHeader: 'Learn & Contribute',
            getStartedToLearnText:'Follow our documents for more information on contributing to CloudSlang and don\'t hesitate to contact us.',
            getStartedToLearnText1:'Orchestrate today, share tomorrow.',
            ideDownloadText: 'Plugin',
            ideDownloadTextIntelliJ: 'IntelliJ',
            ideDownloadTextAtom: 'Atom',
            ideDownloadNote: 'You can download and install directly from your preferred IDE',


            // download popup
            popUpHeader: 'Keep up to date!' ,
            popUpBody: 'For more information on getting started with CloudSlang check out the',
            videoLink: 'introductory video,',
            docsLink: 'Documents',
            popUpBody2: 'or the ',
            tutorialLink: 'Tutorials',
            dot: '.',
            emailField: 'Keep up to date with new ready-made flows and language capabilities. Sign up for the CloudSlang newsletter.',
            emailPrivacy:'We respect your privacy. ' +
                            'Your email address will only be used for communication purposes. It will not be sold, shared with or disclosed to a third party.',


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
