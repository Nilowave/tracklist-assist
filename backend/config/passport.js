const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const sha256 = require('crypto-js/sha256');
const User = require('../src/models/user-model');
const keys = require('./keys');

// const createApiKey = (data) => {
//   const copy = { ...data };
//   copy.today = new Date().toString();
//   const key = sha256(JSON.stringify(copy));
//   return key;
// };

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          const data = {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value.split('?')[0],
          };
          // data.apiKey = createApiKey(data);
          new User(data).save().then((user) => done(null, user));
        }
      });
    },
  ),
);
