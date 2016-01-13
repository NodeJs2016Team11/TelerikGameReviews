'use strict';

let mongoose = require('mongoose');
let encryption = require('../utilities/encryption');

var User = mongoose.model('User');

User.find({
  username: 'admin'
}, function (err, users) {
  if (users.length > 0 || err) {
    return;
  }

  let newSalt = encryption.generateSalt();
  User.create({
    username: 'admin',
    email: 'admin@admin.bg',
    salt: newSalt,
    hashPass: encryption.generateHashedPassword(newSalt, 'admin'),
    roles: ['admin'],
  }, function (err, result) {
    console.log(`Created ${result}`);
  });
});
