const passport = require('passport');
const express = require('express');
const app = express();

module.exports = () => {
  const router = express.Router();

  router.get(
    '/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
    }),
  );

  router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    console.log('google callback');
    res.redirect('/');
  });

  return router;
};
