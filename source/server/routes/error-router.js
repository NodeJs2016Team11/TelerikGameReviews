'use strict';

let express = require('express'),
  auth = require('./../config/auth'),
  router = new express.Router(),
  mongoose = require('mongoose'),
  controller = require('./../controllers/error-controller')();

router.get('/not-authorized', controller.notAuthorized)
    .get('/404', controller.notFound);

module.exports = function (app) {
  app.use('/', router);
};
