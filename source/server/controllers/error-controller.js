'use strict';

module.exports = function () {
  function notAuthorized(req, res) {
    res.render('not-authorized');
  }

  function notFound(req, res) {
    res.render('404');
  }

  let controller = {
    notAuthorized: notAuthorized,
    notFound: notFound
  };

  return controller;
};
