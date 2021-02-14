const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
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
    password: {
        type: String,
        required: true,
        trim: true,
    },
    avatar_url: {
        type: String,
        trim: true,
        default: 'https://img.icons8.com/dotty/50/000000/person-male.png'
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;