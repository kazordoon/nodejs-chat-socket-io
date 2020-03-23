const express = require('express');
const { resolve } = require('path');

const routes = require('./routes');

class App {
  constructor() {
    this.express = express();

    this.settings();
    this.routes();
  }

  settings() {
    this.express.set('views', resolve(__dirname, 'views'));
    this.express.set('view engine', 'ejs');
    this.express.set('PORT', process.env.PORT || 3333);
  }

  routes() {
    this.express.use('/public', express.static(resolve(__dirname, 'public')));
    this.express.use(routes);
  }
}

module.exports = new App().express;
