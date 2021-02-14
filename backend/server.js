const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI || 'mongodb://localhost:27017/mongodb';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
  }).catch(err => console.log(err));
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log("MongoDB success fully connected");
})



app.use(express.json());

app.use(
    cors()
  );
  app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(cookieParser("secretcode"));
require("./passportConfig")(passport);
app.use(passport.initialize());
app.use(passport.session());



const usersRouter = require('./router/user');
const tweetsRouter = require('./router/tweet');

app.use('/users', usersRouter);
app.use('/tweet', tweetsRouter);

app.get('/', (req, res) => {
    res.json("requested at /");
})

app.get('/logout', (req, res) => {
  req.logout();
  res.json("logged out");
})

if (process.env.NODE_ENV === 'production'){
  app.use(express.static('twitter-clone/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'twitter-clone', 'build', 'index.html'));
  })
}

console.log(path.resolve(__dirname,'..', 'twitter-clone', 'build', 'index.html'));

app.listen(port, () => console.log(`listening on ${port}`));