'use strict';

angular.module('cloudSlangWebsiteApp')
    .controller('CarouselCtrl', function ($scope) {

        var init = function () {

            $('.carousel[data-type="multi"] .item').each(function () {
                var next = $(this).next();
                if (!next.length) {
                    next = $(this).siblings(':first');
                }
                next.children(':first-child').clone().appendTo($(this));

                for (var i = 0; i < 2; i++) {
                    next = next.next();
                    if (!next.length) {
                        next = $(this).siblings(':first');
                    }

                    next.children(':first-child').clone().appendTo($(this));
                }

            });
        };

        init();

    });
