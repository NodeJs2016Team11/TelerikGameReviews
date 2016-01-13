'use strict';

let multer = require('multer');
let storage = multer.diskStorage({
  destination: 'public/images',
  filename: function (req, file, cb) {
    let extension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  }
});
// Multer config
let upload = multer({
  storage: storage
});

exports.upload = upload;
