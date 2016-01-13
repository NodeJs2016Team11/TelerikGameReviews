'use strict';

let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let reviewsSchema = mongoose.Schema({
    title: String,
    content: String,
    summary: String,
    dateAdded: { type: Date, default: Date.now },
    slug: String,
    rating: { type: Number, min: 1, max: 10, default: 1 },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    reviewedOn: String,
    images: [String],
    videos: [String]
});

reviewsSchema.plugin(uniqueValidator);

mongoose.model('Review', reviewsSchema);