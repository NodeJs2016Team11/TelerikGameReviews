'use strict';

var encryption = require('../utilities/encryption');

module.exports = function (User) {

  function createUser(req, res, next) {
    var newUserData = req.body;
    newUserData.salt = encryption.generateSalt();
    newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
    User.create(newUserData, function (err, user) {
      let data = {
        user: user,
        err: err
      };

      if (err) {
        console.log(data);
        return res.render('register', {
          data
        });
      }

      if (!user) {
        req.session.error = "wrong username or password";
        console.log(data);
        return res.render('register', {
          data
        });
      }

      req.logIn(user, function (err) {
        if (err) {
          req.session.error = "wrong username or password";
          console.log(data);
          return res.refirect('/');
        }

        res.redirect('/')
      });
    });
  }

  function updateUser(req, res, next) {
    if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
      var updatedUserData = req.body;
      if (updatedUserData.password && updatedUserData.password.length > 0) {
        updatedUserData.salt = encryption.generateSalt();
        updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
      }

      User.update({
        _id: req.body._id
      }, updatedUserData, function () {
        res.end();
      });
    } else {
      res.send({
        reason: 'You do not have permissions!'
      });
    }
  }

  function getAllUsers(req, res, next) {
    console.log("USERS");
    User.find({}).exec(function (err, collection) {
      if (err) {
        console.log('Users could not be loaded: ' + err);
      }
      // console.log(collection);
      res.send(collection);
    });
  }


  let controller = {
    createUser: createUser,
    updateUser: updateUser,
    getAllUsers: getAllUsers
  };

  return controller;
};
