'use strict';

let passport = require('passport');

module.exports = {
  login: function (req, res, next) {
    let auth = passport.authenticate('local', function (err, user) {
      let data = {
        user: user,
        err: err
      };

      if (err) {
        console.log(data);
        return res.render('login', {
          data
        });
      }

      if (!user) {
        req.session.error = "wrong username or password";
        console.log(data);
        return res.render('login', {
          data
        });
      }

      req.logIn(user, function (err) {
        if (err) {
          req.session.error = "wrong username or password";
          console.log(data);
          return res.render('login', {
            data
          });
        }

        res.redirect('/home');
      });
    });

    auth(req, res, next);
  },
  logout: function (req, res, next) {
    req.logout();
    res.redirect('/');
    res.end();
  },
  isAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/not-authorized');
      res.end();
    } else {
      next();
    }
  },
  isInRole: function (role) {
    return function (req, res, next) {
      if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
        next();
      } else {
        res.redirect('/cygwin\not-authorized');
      }
    };
  }
};
