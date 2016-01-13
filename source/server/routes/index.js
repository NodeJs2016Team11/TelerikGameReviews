'use strict';

let fs = require('fs'),
    path = require('path');

module.exports = function (app, upload) {

  fs.readdir(__dirname, function (err, files) {

    if (err) {
      throw new Error();
    }

    files.filter(f => f.indexOf('-router') >= 0)
      .forEach(f => require(path.join(__dirname,'/', f))(app, upload));
  });
};
