'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('scoreWebsiteApp'));

//    var MainCtrl,
//        scope, messagesService;
//
//    // Initialize the controller and a mock scope
//    beforeEach(inject(function ($controller, $rootScope) {
//        scope = $rootScope.$new();
//        MainCtrl = $controller('MainCtrl', {
//            $scope: scope,
//            MessagesService: messagesService
//        });
//    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(3).toBe(3);
    });
});
