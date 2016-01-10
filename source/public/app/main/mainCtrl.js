app.controller('MainCtrl', function($scope, cachedGames) {
    $scope.games = cachedGames.query();
});