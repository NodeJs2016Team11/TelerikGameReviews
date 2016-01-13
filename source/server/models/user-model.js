'use strict';

let mongoose = require('mongoose'),
  encryption = require('../utilities/encryption'),
  uniqueValidator = require('mongoose-unique-validator');

let userSchema = mongoose.Schema({
  username: {
    type: String,
    require: '{PATH} is required',
    unique: true
  },
  firstName: {
    type: String,
    require: '{PATH} is required'
  },
  lastName: {
    type: String,
    require: '{PATH} is required'
  },
  salt: String,
  hashPass: String,
  roles: [String]
});

userSchema.method({
  authenticate: function (password) {
    if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
      return true;
    } else {
      return false;
    }
  }
});

userSchema.plugin(uniqueValidator, { message: 'Username {VALUE} already taken.' });

mongoose.model('User', userSchema);
