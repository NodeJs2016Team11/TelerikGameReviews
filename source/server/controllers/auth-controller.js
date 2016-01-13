'use strict';

var auth = require('../config/auth');

module.exports = function () {
  function register(req, res) {
    res.render('register',{data:{}});
  }

  function login(req, res){
    res.render('login',{data:{}});
  }

  function logout(req,res) {
    auth.logout();
  }

  let controller = {
    register: register,
    login: login,
    logout: logout
  };

  return controller;
};
