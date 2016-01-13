'use strict';

let path = require('path');
let rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/gamereviews',
        port: process.env.PORT || 3001
    }
}
