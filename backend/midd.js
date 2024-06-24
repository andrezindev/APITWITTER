app.use(session({
    secret: 'dEpFESqtAjJoKCMn8yQPiLVFrjYwiOzndlBvShU0xa6ETiq4UR',
    resave: false,
    saveUninitialized: true
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  