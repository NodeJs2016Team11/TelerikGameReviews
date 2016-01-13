'use strict';

let mongoose = require('mongoose');
let encryption = require('../utilities/encryption');

var User = mongoose.model('User');
var Game = mongoose.model('Game');

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


Game.find({}).exec(function(err, collection) {
  if (err) {
    console.log('Cannot find games: ' + err);
    return;
  }

  if (collection.length === 0) {
    console.log('Seeding games...');
    Game.create({name: 'FIFA 11', featured: true, dateAdded: new Date('10/1/2016'), mainPageImage: "images/fifa-16.jpg"});
    Game.create({name: 'Bloodborne', featured: true, dateAdded: new Date('10/1/2016'), mainPageImage: "images/bloodborne.jpg"});
    Game.create({name: 'Call of Duty', featured: false, dateAdded: new Date('13/1/2016'),  mainPageImage: "images/call-of-duty1.jpg"});
    console.log('Initial games seeded!');
  }
});
