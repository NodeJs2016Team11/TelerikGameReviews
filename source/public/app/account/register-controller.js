(function () {
    'use strict';

    function RegisterController($location, auth, notifier) {
        var vm = this;
        vm.signup = function (user) {
            auth.signup(user).then(function () {
                notifier.success('Registration successful!');
                $location.path('/users/login');
            }, function (error) {
                notifier.error(error);
            })
        }
    }

    angular.module('myApp.controllers').controller('SignUpCtrl', ['$location', 'auth', 'notifier', RegisterController]);
}());
