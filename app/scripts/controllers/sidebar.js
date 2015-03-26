'use strict';

angular.module('scoreWebsiteApp')
    .controller('SidebarCtrl', function ($rootScope, MessagesService, $timeout) {

        $('#docs-sidebar').affix();

        function mapToSize() {
            return _.map($('.anchor'), function (target) {
                    var parent = $(target).parent()[0];
                    return {
                        'size' : parent.nodeName.toLowerCase(),
                        'id'   : target.id,
                        'title': parent.textContent
                    }
                }
            ).filter(function (node) {
                    return _.includes(["h1", "h2"], node.size)
                });
        }

        $timeout(function () {
            if (_.isEmpty($rootScope.docsSections)) {
                $rootScope.docsSections = mapToSize();
            }
        }, 1000);

    });
