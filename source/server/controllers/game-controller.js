'use strict';

module.exports = function (Game) {

  function get(req, res) {
    Game.find({}, function (err, games) {
      if (err) {
        throw err;
      }
      res.render('games-all', {
        data: games,
        isAuthenticated: req.isAuthenticated()
      });
    });
  }

  function post(req, res) {
    let reqGame = req.body;
    console.log(reqGame);

    if(!reqGame.image && req.file){
      reqGame.image = req.file.path.substr('public/'.length);
    }
    //validate product
    let game = new Game({
      name: reqGame.name,
      description: reqGame.description,
      image: reqGame.image
    });

    game.save(function (err) {
      res.redirect('/games/' + game._id);
    });
  }

  function getById(req, res) {
    let id = req.params.id;

    Game.findById(id, function (err, game) {
      res.render('game-details', {
        data: game,
        isAuthenticated: req.isAuthenticated()
      });
    });

  }

  function getCreate(req, res) {
    res.render('game-add', {
        isAuthenticated: req.isAuthenticated()
    });
  }

  let controller = {
    get: get,
    post: post,
    getById: getById,
    getCreate: getCreate
  };

  return controller;
};
