const express = require('express');
const authRoutes = require('./routes/auth-routes');
const googleSetup = require('./config/google');
const githubSetup = require('./config/github');
const mongoose = require('mongoose');
const dataBase = require('./utils/helper');
// const cookieSession = require('cookie-session');
const passport = require('passport');
const profileRoutes = require('./routes/profileAuth');
const session = require('express-session');

try {
  mongoose.connect('mongodb://localhost:27017/OTH');
  console.log('Database Connection Successful');
} catch (error) {
  handleError(error);
}

const app = express();

app.use(session({ secret: 'cats' }));

// app.use(
//   cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [123456789],
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

// set view engine
app.set('view engine', 'ejs');

// create home route
app.get('/', (req, res) => {
  res.render('home');
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(3000, () => {
  console.log('app now listening for requests on port 3000');
});
