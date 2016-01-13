(function () {
    'use strict';

    function identity($cookieStore) {
        var cookieStorageUserKey = 'currentApplicationUser';

        var currentUser;

        var service = {
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            isAuthenticated: isAuthenticated
        }

        return service;


        function getCurrentUser() {
            var savedUser = $cookieStore.get(cookieStorageUserKey);
            if (savedUser) {
                return savedUser;
            }

            return currentUser;
        };

        function setCurrentUser(user) {
            if (user) {
                $cookieStore.put(cookieStorageUserKey, user);
            } else {
                $cookieStore.remove(cookieStorageUserKey);
            }

            currentUser = user;
        };

        function isAuthenticated() {
            return !!this.getCurrentUser();
        };

    }

    angular.module('myApp.services').factory('identity', ['$cookieStore', identity]);
}());
