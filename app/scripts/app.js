'use strict';

angular
    .module('scoreWebsiteApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/header.html',
                controller: 'HeaderCtrl'
            })
            .when('/docs', {
                templateUrl: 'views/docs.html',
                controller: 'DocsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
