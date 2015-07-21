'use strict';

angular.module('cloudSlangWebsiteApp')
    .controller('GetStartedCtrl', function () {

            if ($.browser.msie) {
                $('.modal').removeClass('fade');
            }
    });
