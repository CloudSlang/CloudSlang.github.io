'use strict';

angular.module('scoreWebsiteApp')
    .controller('AboutCtrl', function () {

    }).directive('hoverMemberImage', function(){
        return {
            restrict: 'E',
            replace: true,
            template:
                '<div>' +
                    '<img class="img-responsive" ng-src="{{memberImage}}" height="225px" width="308px">' +
                    '<p class="h4 text-center">{{memberName}}</p>' +
                '</div>',
            scope: {
                memberImage: '=member',
                memberName: '@name'
            },
            link: function(scope, elm, attrs){
                var imagesPath = 'images/team/';
                var hoverPrefox = 'Yearbook';
                scope.memberName = attrs.name;
                scope.memberImage = imagesPath + hoverPrefox + attrs.member + ".jpg";
                elm.bind('mouseenter',function(){
                    scope.memberImage = imagesPath + attrs.member + ".jpg";
                    scope.$apply();
                });
                elm.bind('mouseleave',function(){
                    scope.memberImage = imagesPath + hoverPrefox + attrs.member + ".jpg";
                    scope.$apply();
                });
            }
        };
    });