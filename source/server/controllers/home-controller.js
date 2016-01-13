'use strict';

var auth = require('../config/auth');

module.exports = function (Product) {

  function goHome(req, res) {
    res.redirect('/home');
  }


  function get(req, res) {
    Product.find({}, {}, {
      skip: 0, // Starting Row
      limit: 5, // Ending Row
      sort: {
        date: -1 //Sort by Date Added DESC
      }
    }, function (err, products) {
      res.render('home', {
        data: products,
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
