const router = require('express').Router();

const authCheck = (req, res, next) => {
  //   console.log(req.isAuthenticated(), req.session);
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('/', authCheck, (req, res) => {
  const filePath = `${process.cwd()}/views/welcome.ejs`;
  res.render(filePath, { user: req.user });
});

router.get('/profile', authCheck, (req, res) => {
  const filePath = `${process.cwd()}/views/profile.ejs`;
  res.render(filePath, { user: req.user });
});

module.exports = router;
