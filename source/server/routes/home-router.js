'use strict';

let express = require('express'),
  mongoose = require('mongoose');

let router = new express.Router();
let Game = mongoose.model('Game');

let controller = require('./../controllers/home-controller')(Game);

router.get('/', controller.goHome)
  .get('/home', controller.get);

module.exports = function (app) {
  app.use('/', router);
};
