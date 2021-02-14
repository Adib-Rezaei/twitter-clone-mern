# MERN Twitter clone app

![badge](https://img.shields.io/badge/Version-0.1.0-green.svg)
[![badge](https://img.shields.io/github/issues/Adib-Rezaei/Twitter-clone?color=red)](https://github.com/Adib-Rezaei/Twitter-clone/issues)
![badge](https://img.shields.io/github/license/Adib-Rezaei/Twitter-clone)

First project in order to demonstrate MongoDB/Express/React/Nodejs web app.

## Quick Start
### Back-end
Go to the root directory and run these commands:

First install dependencies:
```markdown
$ npm install
```

Specify mongoDB configuration in .env file or
Make sure you have mongoDB activated on your local machine by:
```markdown
$ sudo systemctl status mongod
```
Start the server:
```markdown
$ npm run dev
```

### Front-end
Go to the root directory and run these commands:

First install dependencies:
```markdown
$ npm install
```
Run app:
```markdown
$ npm start
```

## To-Do

* [ ] user account
    * [ ] user follow and unfollow
    * [ ] build user home page
    * [ ] make profile tab more detailed at header with user informaition (bio, ...)
    * [ ] profile picture upload
    * [ ] make retweet and reply work
    * [ ] user @mentions


* [ ] UI
    * [ ] dark mode
    * [ ] compose a tweet using button in sidebar
    * [ ] error messages with toast notification
    * [ ] loading animation 'till fetching data
    * [ ] responsive page
    * [ ] make emojis available at tweet box
    * [ ] name of users have a link to their profiles in notification
    * [ ] order notifications with timestamp

* [ ] database
    * [ ] put timestamp in posts
    * [ ] tweets have userID
    * [ ] users have list of tweets with ids scpecified

* [x] backend
    * [x] handle cookies 
    * [x] handle errors
    * [ ] input validation
