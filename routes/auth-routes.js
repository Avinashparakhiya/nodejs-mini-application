const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

// callback route for google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  res.redirect('/profile');
});

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['profile'],
  })
);

router.get('/github/callback', passport.authenticate('github'), (req, res) => {
  // res.send(req.user);
  res.redirect('/profile');
});
module.exports = router;
