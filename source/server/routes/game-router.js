'use strict';

let express = require('express'),
  mongoose = require('mongoose'),
  auth = require('./../config/auth');

let router = new express.Router();

let Game = mongoose.model('Game');

let controller = require('./../controllers/game-controller')(Game);

module.exports = function (app, upload) {
  router.get('/', controller.get)
    .get('/add',auth.isAuthenticated, controller.getCreate)
    .get('/:id', controller.getById)
    .post('/', upload.single('image-file'), controller.post)
    .put('/rate/:id', controller.put);

  app.use('/games', router);
};
