'use strict';

angular.module('cloudSlangWebsiteApp')
    .controller('GettingStartedCtrl', function () {

        $('[data-toggle=modal]').on('click', function (e) {
            var $target = $($(this).data('target'));
            $target.data('triggered',true);
            setTimeout(function() {
                if ($target.data('triggered')) {
                    $target.modal('show')
                        .data('triggered',false); // prevents multiple clicks from reopening
                }
            }, 3000); // milliseconds
            return false;
        });
});
