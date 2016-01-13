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
    let reqGame = req.body,
        images = [],
        videos = [];

    images.push(req.file.path);

    if(req.body.video) {
      videos.push(req.body.video);
    }

    let game = new Game({
      name: reqGame.name,
      description: reqGame.description,
      price: +reqGame.price,
      images: images,
      videos: videos,
      tags: reqGame.tags.split(' ')
    });
    game.save(function (err) {
      if(err) throw err;

      res.redirect('/games/' + game._id);
    });
  }

  function getById(req, res) {
    let id = req.params.id;

    Game.findById(id, function (err, game) {
      console.log(game);
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
