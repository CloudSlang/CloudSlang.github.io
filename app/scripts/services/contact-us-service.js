'use strict';

angular.module('scoreWebsiteApp')
.factory('ContactUsService', ['$http', function ($http) {
        var self = {};

        self.contactUs = function (emailData, onSuccess, onError) {
            $http.post('/contact', emailData).then(function(response, status) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if (onSuccess) {
                        onSuccess(response.data, status);
                    }
                },
                function(response, status) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    if (onError) {
                        onError(response.data, status);
                    }
                });
        };

        return self;
    }]);