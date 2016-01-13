'use strict';

let fs = require('fs'),
    path = require('path');

let files = fs.readdirSync(__dirname)
  .filter(f => f.indexOf('-model') >= 0)
  .forEach(f => require(path.join(__dirname,'/', f)));
