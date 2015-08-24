'use strict';

angular
    .module('cloudSlangWebsiteApp', [
        'ngAnimate',
        'ngRoute',
        'hljs',
        'mailchimp',
        'ui.bootstrap'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
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
    });
