'use strict';

angular.module('scoreWebsiteApp')
    .controller('AboutCtrl', function () {

    }).directive('hoverMemberImage', ['$timeout', function(timer) {
        return {
            restrict: 'E',
            replace: true,
            template:
                '<div>' +
                    '<img class="img-responsive" src="{{memberImage}}" height="225px" width="308px">' +
                    '<p class="h4 text-center">{{memberName}}</p>' +
                '</div>',
            scope: {
                memberImage: '=member',
                memberName: '@name'
            },
            link: function(scope, elm, attrs) {

                var hoverMemberImage = function () {
                    var imagesPath = 'images/team/';
                    var hoverPrefix = 'yearbook';
                    scope.memberName = attrs.name;
                    scope.memberImage = imagesPath + hoverPrefix + attrs.member + ".jpg";
                    elm.bind('mouseenter',function(){
                        scope.memberImage = imagesPath + attrs.member + ".jpg";
                        scope.$apply();
                    });
                    elm.bind('mouseleave',function(){
                        scope.memberImage = imagesPath + hoverPrefix + attrs.member + ".jpg";
                        scope.$apply();
                    });
                };

                timer(hoverMemberImage, 0); // must be renered after dom is finished
            }
        };
    }]);