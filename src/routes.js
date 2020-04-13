const routes = require('express').Router();
const passport = require('passport');

const AuthController = require('./controllers/AuthController');

const { checkAuthenticated, checkNotAuthenticated } = require('./middlewares/checkAuthentication');

routes.get('/', checkAuthenticated, (req, res) => {
  res.render('index', { user: req.user });
});

routes.get('/login', checkNotAuthenticated, AuthController.renderLogin);
routes.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

routes.get('/register', checkNotAuthenticated, AuthController.renderRegister);
routes.post('/register', checkNotAuthenticated, AuthController.register);

module.exports = routes;
