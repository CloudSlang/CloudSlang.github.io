'use strict';

angular.module('scoreWebsiteApp')
    .controller('ContactUsCtrl', function ($scope, $rootScope, ContactUsService) {
        $scope.submitForm = function (mailOptions) {

            function onSuccess() {
                $scope.submitSuccess = true;
                $scope.submitted = true;
                $scope.submitMessage = $rootScope.messages.contactSuccess;
            }

            function onError() {
                $scope.submitSuccess = false;
                $scope.submitted = true;
                $scope.submitMessage = $rootScope.messages.contactFailure;
            }

            ContactUsService.contactUs(mailOptions, onSuccess, onError);
        };
    });