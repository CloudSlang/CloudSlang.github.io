'use strict';

angular.module('cloudSlangWebsiteApp')
    .controller('SidebarCtrl', function ($rootScope, $http) {

        function populateSideBar() {
            $http.get('views/docs/generated/sidebar.json').then(function(response) {
                $rootScope.docsSections = response.data;
            });
        }

        if (_.isEmpty($rootScope.docsSections)) {
            $rootScope.docsSections = populateSideBar();
        }

    });
