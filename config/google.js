const passport = require('passport');
const express = require('express');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user-model');
const res = require('express/lib/response');
const app = express();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ id }).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID:
        '94232511282-6gb532becg0c8jrpbnpka5j0758sss8s.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    (request, accessToken, refreshToken, profile, done) => {
      User.findOne({ id: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log('User is Already Register');
          done(null, currentUser);
        } else {
          new User({
            name: profile.displayName,
            id: profile.id,
            login_method: 'by-google',
          })
            .save()
            .then((newUser) => {
              console.log('New User Created-Google');
              done(null, newUser);
            });
        }
      });
    }
  )
);
