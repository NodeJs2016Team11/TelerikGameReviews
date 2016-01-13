(function () {
    'use strict';

    function auth($http, $q, $location, identity, authorization, baseServiceUrl) {
        var usersApi = baseServiceUrl;


        var service = {
            signup: signup,
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated
        };

        return service;

        function signup(user) {
            var deferred = $q.defer();

            $http.post(usersApi + '/register', user)
                .then(function () {
                    deferred.resolve();
                    $location.path('/');

                }, function (response) {
                    var error = response.data.modelState;
                    if (error && error[Object.keys(error)[0]][0]) {
                        error = error[Object.keys(error)[0]][0];
                    } else {
                        error = response.data.message;
                    }

                    deferred.reject(error);
                });

            return deferred.promise;
        };

        function login(user) {
            debugger;
            var deferred = $q.defer();
            user['grant_type'] = 'password';
            $http.post(baseServiceUrl + '/token', 'username=' + user.username + '&password=' + user.password + '&grant_type=password', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then(function (response) {
                    if (response.data["access_token"]) {
                        identity.setCurrentUser(response.data);
                        deferred.resolve(true);
                    } else {
                        deferred.resolve(false);
                    }
                });

            return deferred.promise;
        };

        function logout() {
            var deferred = $q.defer();

            var headers = authorization.getAuthorizationHeader();
            $http.post(usersApi + '/logout', {}, {
                    headers: headers
                })
                .then(function () {
                    identity.setCurrentUser(undefined);
                    deferred.resolve();
                });

            return deferred.promise;
        };

        function isAuthenticated() {
            if (identity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        };
    }


    angular.module('myApp.services')
        .factory('auth', ['$http', '$q','$location', 'identity', 'authorization', 'baseServiceUrl', auth]);
}());
