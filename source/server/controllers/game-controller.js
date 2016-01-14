'use strict';

var auth = require('../config/auth');

module.exports = function (Game) {

  function get(req, res) {
    Game.find({}, function (err, games) {
      if (err) {
        throw err;
      }
      res.render('games-all', {
        data: games,
        isAuthenticated: req.isAuthenticated(),
        isAdmin: auth.isInRole("admin")
      });
    });
  }

  function post(req, res) {
    let reqGame = req.body,
        images = [],
        videos = [];

    var image = "images/" + req.file.filename;
    images.push(image);

    if(req.body.video) {
      videos.push(req.body.video);
    }

    let game = new Game({
      name: reqGame.name,
      description: reqGame.description,
      images: images,
      videos: videos,
      mainPageImage: image,
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
      //console.log(game);
      res.render('game-details', {
        data: game,
        isAuthenticated: req.isAuthenticated(),
        isAdmin: auth.isInRole("admin")
      });
    });

  }

  function getCreate(req, res) {
    res.render('game-add', {
      isAuthenticated: req.isAuthenticated(),
      isAdmin: auth.isInRole("admin")
    });
  }

  function rate(req, res) {
    Game.findById(req.params.id, function(err, game) {
      if(game != undefined) {
        if(req.body.type == 'up') {
          ++game.rating;
          game.save(function (err, success) {
            if(err) console.log(err);
            res.json({
              success: true
            });
          })
        }
        else if(req.body.type == 'down') {
          --game.rating;
          game.save(function (err, success) {
            if(err) console.log(err);
            res.json({
              success: true
            });
          })
        }
      }
      else {
        res.json({success: false});
      }
    });
  }

  let controller = {
    get: get,
    post: post,
    getById: getById,
    getCreate: getCreate,
    put: rate
  };

  return controller;
};
