$(document).on('click', '.rateUpGame', function (event) {
    var gameId = $(event.target).attr('data-id');
    $.ajax('/games/rate/' + gameId, {
        method: "PUT",
        data: {
            type: 'up'
        }
    }).then(function (response) {
        if(response.success) {
            location.reload();
        }
    });
});

$(document).on('click', '.rateDownGame', function (event) {
    var gameId = $(event.target).attr('data-id');
    $.ajax('/games/rate/' + gameId, {
        method: "PUT",
        data: {
            type: 'down'
        }
    }).then(function (response) {
        if(response.success) {
            location.reload();
        }
    });
});