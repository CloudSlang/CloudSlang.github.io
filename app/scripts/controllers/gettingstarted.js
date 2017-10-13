'use strict';

angular.module('cloudSlangWebsiteApp')
    .controller('GettingStartedCtrl', function () {

        $('#delay').on('click', function (e) {

            e.preventDefault();  //stop the browser from following
            window.location.href = 'https://github.com/CloudSlang/cloud-slang/releases/download/cloudslang-1.0.10/cslang-cli-with-content.zip';


            var $target = $($(this).data('target'));
            $target.data('triggered', true);
            setTimeout(function () {
                if ($target.data('triggered')) {
                    $target.modal('show')
                        .data('triggered', false); // prevents multiple clicks from reopening
                }
            }, 4000); // milliseconds
            return false;
        });

        $('#delay1').on('click', function (e) {

            e.preventDefault();  //stop the browser from following
            window.location.href = 'https://github.com/CloudSlang/cloud-slang/releases/download/cloudslang-1.0.10/cslang-cli-with-content.tar.gzip';

            var $target = $($(this).data('target'));
            $target.data('triggered', true);
            setTimeout(function () {
                if ($target.data('triggered')) {
                    $target.modal('show')
                        .data('triggered', false); // prevents multiple clicks from reopening
                }
            }, 4000); // milliseconds
            return false;
        });
    });
