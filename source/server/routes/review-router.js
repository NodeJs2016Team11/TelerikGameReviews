'use strict';

let express = require('express'),
    mongoose = require('mongoose'),
    auth = require('./../config/auth');

let router = new express.Router();

let Review = mongoose.model('Review');
let Game = mongoose.model('Game');

let controller = require('./../controllers/review-controller')(Review, Game);

module.exports = function (app, upload) {
    router.get('/', controller.get)
        .get('/add',auth.isAuthenticated, controller.getCreate)
        .get('/:id', controller.getById)
        .post('/', upload.single('image-file'), controller.post);

    app.use('/reviews', router);
};