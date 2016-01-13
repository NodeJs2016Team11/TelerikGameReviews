'use strict';

let express = require('express'),
  auth = require('./../config/auth'),
  router = new express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  authController = require('./../controllers/auth-controller')(),
  userController = require('./../controllers/user-controller')(User);

router.post('/register', userController.createUser)
  .get('/login', authController.login)
  .post('/login', auth.login)
  .post('/logout', auth.logout);

module.exports = function (app) {
  app.use('/', router);
};
