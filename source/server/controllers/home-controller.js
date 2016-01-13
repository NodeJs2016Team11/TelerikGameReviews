'use strict';

var auth = require('../config/auth');

module.exports = function (Game) {

  function goHome(req, res) {
    res.redirect('/home');
  }


  function get(req, res) {
    Game.find({}, {}, {
      skip: 0, // Starting Row
      limit: 5, // Ending Row
      sort: {
        date: -1 //Sort by Date Added DESC
      }
    }, function (err, games) {
      console.log(games);
      res.render('home', {
        data: games,
        isAuthenticated: req.isAuthenticated()
      });
    });
  }

  let controller = {
    get: get,
    goHome: goHome
  };

  return controller;
};
