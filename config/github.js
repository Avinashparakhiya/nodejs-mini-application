const passport = require('passport');
const express = require('express');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user-model');
const res = require('express/lib/response');
const app = express();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: 'd13b9f8e0d73fd3578b0',
      clientSecret: 'd0a776900e76cff613af74882841f5195d2ef0cc',
      callbackURL: '/auth/github/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      //find user is already registered or not
      User.findOne({ id: profile.id }).then((currentUser) => {
        if (currentUser) {
          // res.render('welcome');
          console.log('User is Already Register');
          done(null, currentUser);
        } else {
          new User({
            name: profile.username,
            id: profile.id,
          })
            .save()
            .then((newUser) => {
              console.log('New User Created-Github');
              done(null, newUser);
            });
        }
      });
      // save user data
    }
  )
);
