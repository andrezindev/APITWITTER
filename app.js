const express = require('express');
const session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const Twitter = require('twitter');

const app = express();
app.use(express.json());

// Configure session
app.use(session({
  secret: 'your_secret',
  resave: false,
  saveUninitialized: true
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Twitter strategy
passport.use(new TwitterStrategy({
  consumerKey: 'A7OzbZHyQFMauJrgt8XPyxwsT',
  consumerSecret: 'dEpFESqtAjJoKCMn8yQPiLVFrjYwiOzndlBvShU0xa6ETiq4UR',
  callbackURL: "http://localhost:3000/auth/twitter/callback"
},
  function (token, tokenSecret, profile, done) {
    return done(null, profile);
  }
));

// Serialize user
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Routes
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Configure Twitter client
const client = new Twitter({
  consumer_key: 'dEpFESqtAjJoKCMn8yQPiLVFrjYwiOzndlBvShU0xa6ETiq4UR',
  consumer_secret: 'dEpFESqtAjJoKCMn8yQPiLVFrjYwiOzndlBvShU0xa6ETiq4UR',
  access_token_key: '1676055773141401602-PTaS0HweQFpYCmbAG8Nc95QMibvJOb',
  access_token_secret: 'PDpgszK2yqpduxLVAABXahEoUIaJK29KfVNyMZi87jRtQ'
});

// Postar no Twitter
app.post('/tweet', (req, res) => {
  const status = req.body.status;

  client.post('statuses/update', { status: status }, (error, tweet, response) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(tweet);
    }
  });
});

// Consultar Tweets
app.get('/tweets', (req, res) => {
  const params = { screen_name: 'your_screen_name' };

  client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(tweets);
    }
  });
});

// Serve static files
app.use(express.static('frontend'));

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});
