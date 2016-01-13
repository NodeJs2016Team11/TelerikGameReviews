'use strict';

let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let gamesSchema = mongoose.Schema({
    name: String,
    description: String,
    dateAdded: { type: Date, default: Date.now },
    slug: String,
    rating: { type: Number, min: 1, max: 10, default: 1 },
    images: [String],
    videos: [String],
    featured: Boolean,
    timesVisited: Number,
    tags: [String],
    mainPageImage: String
});

gamesSchema.plugin(uniqueValidator);

mongoose.model('Game', gamesSchema);