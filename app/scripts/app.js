'use strict';

angular
    .module('cloudSlangWebsiteApp', [
        'ngAnimate',
        'ngRoute',
        'hljs',
        'angular-carousel',
        'mailchimp'
    ])
    .config(function ($routeProvider) {
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
            .otherwise({
                redirectTo: '/'
            });
    });
