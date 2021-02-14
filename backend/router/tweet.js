const router = require('express').Router();
let Tweet = require('../models/tweet');


router.route('/').post((req, res) => {
    let newTweet = new Tweet(req.body);
    console.log(newTweet);
    newTweet.save()
        .then(() => res.json(newTweet.toJSON()))
        .catch(err => res.status(400).json('Error adding Tweet ' + err));
})

router.route('/').get((req, res) => {
    Tweet.find()
        .then(tweets => res.json(tweets))
        .catch(err => res.status(400).json('Error getting tweets ' + err));
})

router.route('/').delete((req, res) => {
    Tweet.deleteMany({})
        .then(() => {
            res.json('deleted All');
        })
        .catch(err => {
            res.json('error at deleting all ' + err);
        })
})

router.route('/likes').put((req, res) => {
    if(req.body.active){
        Tweet.findOneAndUpdate({_id: req.body.tweet_id}, {$push: {likes: req.body.user_id}}, {new: true})
            .then((arr) => res.json(arr))
            .catch(err => res.json("Error at adding like --- ", err));
    } else {
        Tweet.findOneAndUpdate({_id: req.body.tweet_id}, { $pull: { likes: req.body.user_id}}, {new: true})
            .then((arr) => res.json(arr))
            .catch(err => res.json("Error at deleting like --- ", err));
    }
})

router.route('/retweets').put((req, res) => {
    if(req.body.active){
        Tweet.findOneAndUpdate({_id: req.body.tweet_id}, {$push: {retweets: req.body.user_id}}, {new: true})
            .then((arr) => res.json(arr))
            .catch(err => res.json("Error at adding retweet --- ", err));
    } else {
        Tweet.findOneAndUpdate({_id: req.body.tweet_id}, { $pull: { retweets: req.body.user_id}}, {new: true})
            .then((arr) => res.json(arr))
            .catch(err => res.json("Error at deleting retweet --- ", err));
    }
})

router.route('/comments').put((req, res) => {
    if(req.body.active){
        Tweet.findOneAndUpdate({_id: req.body.tweet_id}, {$push: {comments: req.body.user_id}}, {new: true})
            .then((arr) => res.json(arr))
            .catch(err => res.json("Error at adding comment --- ", err));
    } else {
        Tweet.findOneAndUpdate({_id: req.body.tweet_id}, { $pull: { comments: req.body.user_id}}, {new: true})
            .then((arr) => res.json(arr))
            .catch(err => res.json("Error at deleting comment --- ", err));
    }
})


module.exports = router;