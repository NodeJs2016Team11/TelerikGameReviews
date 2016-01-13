'use strict';

module.exports = function () {
  function register(req, res) {
    res.render('register',{data:{}});
  }

  function login(req, res){
    res.render('login',{data:{}});
  }

  let controller = {
    register: register,
    login: login
  };

  return controller;
};
