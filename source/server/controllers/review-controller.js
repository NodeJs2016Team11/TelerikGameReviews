'use strict';

var auth = require('../config/auth');

module.exports = function (Review, Game) {

    function get(req, res) {
        Review.find({}, function (err, reviews) {
            if (err) {
                throw err;
            }
            res.render('reviews-all', {
                data: reviews,
                isAuthenticated: req.isAuthenticated(),
                isAdmin: auth.isInRole("admin")
            });
        });
    }

    function post(req, res) {
        let reqReview = req.body;

        let review = new Review({
            title: reqReview.title,
            gameId: reqReview.game,
            content: reqReview.content,
            summary: reqReview.summary,
            tags: reqReview.tags.split(' ')
        });
        review.save(function (err) {
            if(err) throw err;

            res.redirect('/reviews/' + review._id);
        });
    }

    function getById(req, res) {
        let id = req.params.id;

        Review.findById(id, function (err, review) {
            console.log(review);
            res.render('review-details', {
                data: review,
                isAuthenticated: req.isAuthenticated(),
                isAdmin: auth.isInRole("admin")
            });
        });

    }

    function getCreate(req, res) {
        Game.find({}, function (err, games) {
            console.log(games);
            res.render('review-add', {
                data: games,
                isAuthenticated: req.isAuthenticated(),
                isAdmin: auth.isInRole("admin")
            });
        });
    }

    let controller = {
        get: get,
        post: post,
        getById: getById,
        getCreate: getCreate
    };

    return controller;
};
