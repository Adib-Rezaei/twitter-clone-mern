const router = require('express').Router();
let User = require('../models/user');
const bcrypt = require("bcryptjs");
const passport = require("passport");


router.route('/add').post(async (req, res) => {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    let newUser = new User({
        avatar_url: req.body.avatar_url,
        displayName: req.body.displayName,
        username: req.body.username,
        password: hashedPass
    });
    await newUser.save()
        .then(() => res.json(newUser.toJSON()))
        .catch(err => res.status(400).json('Error adding user ' + err));
})

router.route('/').get(async (req, res) => {
    console.log(req.user);
    await User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error getting users ' + err));
})

router.route('/').post((req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.json(user);
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            console.log(req.user);
            res.json(req.user);
          });
        }
      })(req, res, next);

    // User.findOne({ displayName: req.body.displayName, password: req.body.password})
    //     .then((user) => {
    //         if(user)
    //             res.json(user);
    //         else 
    //             res.json('not found');
    //     })
    //     .catch(err => {
    //         res.json('error finding user ' + err);
    //     })
})

router.route('/deleteAll').delete((req, res) => {
    User.deleteMany({})
        .then(() => {
            res.json('deleted All');
        })
        .catch(err => {
            res.json('error at deleting all ' + err);
        })
})

router.route('/getUser').get((req, res) => {
    console.log(req.user);
    res.json(req.user);
})

module.exports = router;