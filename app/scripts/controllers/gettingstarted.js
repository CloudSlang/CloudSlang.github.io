'use strict';

angular.module('cloudSlangWebsiteApp')
    .controller('GettingStartedCtrl', function () {

        $('[data-toggle=modal]').on('click', function (e) {

            e.preventDefault();  //stop the browser from following
            window.location.href = 'https://github.com/CloudSlang/cloud-slang/releases/download/cloudslang-0.7.15/cslang-cli.zip';

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
