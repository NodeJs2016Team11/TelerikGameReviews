(function () {
    'use strict';

    function config($routeProvider) {

        var PARTIALS_PREFIX = 'views/partials/';
        var CONTROLLER_AS_VIEW_MODEL = 'vm';

        // Toastr settings
        // toastr.options.showMethod = 'slideDown';
        // toastr.options.closeButton = true;
        // toastr.options.hideMethod = 'slideUp';
        // toastr.options.closeMethod = 'slideUp';
        // toastr.options.preventDuplicates = true;
        // toastr.options.timeOut = 3000;
        // toastr.options.progressBar = true;

        // Route resolvers
        var routeResolvers = {
            authenticationRequired: {
                authenticate: ['$q', 'auth', function ($q, auth) {
                    return auth.isAuthenticated();
                }]
            }
        }

        $routeProvider
            .when('/', {
                templateUrl: PARTIALS_PREFIX + 'home/home.html',
                controller: 'HomeController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/unauthorized', {
                template: '<h1 class="text-center">YOU ARE NOT AUTHORIZED!</h1>'
            })
            .when('/commits', {
                templateUrl: PARTIALS_PREFIX + 'commits/all-commits.html',
                controller: 'CommitsController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/commits/create', {
                templateUrl: PARTIALS_PREFIX + 'commits/create-commit.html',
                controller: 'CreateCommitController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/commits/:commitId', {
                templateUrl: PARTIALS_PREFIX + 'commits/commit-details.html',
                controller: 'CommitDetailsController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/commits/byProject/:projectId', {
                templateUrl: PARTIALS_PREFIX + 'commits/commits-byProject.html',
                controller: 'LatestCommitsController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/projects', {
                templateUrl: PARTIALS_PREFIX + 'projects/all-projects.html',
                controller: 'ProjectsController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/projects/all', {
                templateUrl: PARTIALS_PREFIX + 'projects/all-projects.html',
                controller: 'ProjectsController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL
            })
            .when('/projects/create', {
                templateUrl: PARTIALS_PREFIX + 'projects/create-project.html',
                controller: 'CreateProjectController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/projects/:projectId', {
                templateUrl: PARTIALS_PREFIX + 'projects/project-details.html',
                controller: 'ProjectDetailsController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/projects/collaborators/:projectId', {
                templateUrl: PARTIALS_PREFIX + 'projects/collaborators.html',
                controller: 'ProjectDetailsController',
                controllerAs: CONTROLLER_AS_VIEW_MODEL,
                resolve: routeResolvers.authenticationRequired
            })
            .when('/register', {
                templateUrl: PARTIALS_PREFIX + 'identity/register.html',
                controller: 'SignUpCtrl',
                controllerAs: CONTROLLER_AS_VIEW_MODEL

            })
            .when('/login', {
                templateUrl: PARTIALS_PREFIX + 'identity/login.html',
                controller: 'LoginCtrl',
                controllerAs: CONTROLLER_AS_VIEW_MODEL


            })
            .when('/users/logout', {
                templateUrl: PARTIALS_PREFIX + 'identity/logout.html',
                controller: 'LoginCtrl',
                controllerAs: CONTROLLER_AS_VIEW_MODEL,
                resolve: routeResolvers.authenticationRequired
            })

        .otherwise({
            redirectTo: '/'
        });
    }

    function run($http, $cookies, $rootScope, $location, auth) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {

            if (rejection === 'not authorized') {
                $location.path('/unauthorized');
            }
        });
    };

    angular.module('myApp.services', []);
    angular.module('myApp.directives', []);
    angular.module('myApp.filters', []);
    angular.module('myApp.controllers', ['myApp.services']);
    angular.module('myApp', ['ngRoute', 'ngCookies', 'myApp.controllers', 'myApp.directives', 'myApp.filters'])
        .config(['$routeProvider', config])
        .run(['$http', '$cookies', '$rootScope', '$location', 'auth', run])
        // .value('toastr', toastr)
        .constant('baseServiceUrl', 'http://localhost:3001');
}());
