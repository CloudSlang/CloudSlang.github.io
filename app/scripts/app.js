'use strict';

angular
    .module('cloudSlangWebsiteApp', [
        'ngAnimate',
        'ngRoute',
        'hljs',
        'mailchimp',
        'ui.bootstrap',
        'angulartics',
        'angulartics.google.analytics'
    ])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/docs', {
                templateUrl: 'views/docs.html',
                controller: 'DocsCtrl'
            })
            .when('/blog', {
                templateUrl: 'views/blog.html',
                controller: 'BlogCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'MainCtrl'
            })
            .when('/getstarted', {
                templateUrl: 'views/getstarted.html',
                controller: 'GettingStartedCtrl'
            })
            .when('/community', {
                templateUrl: 'views/community.html',
                controller: 'CommunityCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    });
