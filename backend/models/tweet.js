const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TweetSchema = new Schema ({
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    avatar_url: {
        type: String,
        trim: true,
        default: 'https://img.icons8.com/dotty/50/000000/person-male.png'
    },
    text: {
        type: String,
        trim: true,
        default: ''
    },
    likes: {
        type: Array,
    },
    retweets: {
        type: Array,
    },
    comments: {
        type: Array,
    }
})

const Tweet = mongoose.model('Tweet', TweetSchema);
module.exports = Tweet;