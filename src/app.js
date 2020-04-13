const express = require('express');
const { resolve } = require('path');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const routes = require('./routes');
const initializePassport = require('./config/passport');

initializePassport(passport);

class App {
  constructor() {
    this.express = express();

    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.express.set('views', resolve(__dirname, 'views'));
    this.express.set('view engine', 'ejs');

    this.express.set('HOST', process.env.HOST || 'localhost');
    this.express.set('PORT', process.env.PORT || 3333);
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));

    const sessionOptions = {
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
    };
    this.express.use(session(sessionOptions));
    this.express.use(flash());
    this.express.use(passport.initialize());
    this.express.use(passport.session());
  }

  routes() {
    this.express.use('/public', express.static(resolve(__dirname, 'public')));
    this.express.use(routes);
  }
}

module.exports = new App().express;
