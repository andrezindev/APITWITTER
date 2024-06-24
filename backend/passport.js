passport.use(new TwitterStrategy({
    consumerKey: 'A7OzbZHyQFMauJrgt8XPyxwsT',
    consumerSecret: 'dEpFESqtAjJoKCMn8yQPiLVFrjYwiOzndlBvShU0xa6ETiq4UR',
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
    function (token, tokenSecret, profile, done) {
      return done(null, profile);
    }
  ));
  