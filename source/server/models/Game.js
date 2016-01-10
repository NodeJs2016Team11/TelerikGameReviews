var mongoose = require('mongoose');

var gamesSchema = mongoose.Schema({
    name: String,
    description: String,
    dateAdded: { type: Date, default: Date.now },
    slug: String,
    rating: { type: Number, min: 1, max: 10 },
    images: [String],
    videos: [String],
    featured: Boolean,
    timesVisited: Number,
    tags: [String]
});

var Game = mongoose.model('Game', gamesSchema);

module.exports.seedInitialGames = function() {
    Game.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find games: ' + err);
            return;
        }

        if (collection.length === 0) {
            Game.create({name: "FIFA 16", description: "The coolest football game ever!", featured: true, tags: ['Sports', 'Football']});
            Game.create({name: "Diablo III", description: "An awesome game!", tags: ['Blizzard']});
        }
    });
};
