const User = require('../models/User');

const { validateUsername, validatePasswords } = require('../validators/userValidator');

class AuthController {
  renderLogin(req, res) {
    try {
      return res.render('login');
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  renderRegister(req, res) {
    try {
      return res.render('register');
    } catch (err) {
      return res.sendStatus(500);
    }
  }

  async register(req, res) {
    try {
      const { username, password1, password2 } = req.body;

      const userExists = await User.findOne({ username });
      if (userExists) {
        req.flash('error', "There's already an account with that username.");
        return res.status(409).render('register');
      }

      const invalidUsername = !(validateUsername(username));
      if (invalidUsername) {
        req.flash('error', 'Invalid username.');
        return res.status(406).render('register');
      }

      const invalidPasswords = !(validatePasswords(password1, password2));
      if (invalidPasswords) {
        req.flash('error', 'Invalid password.');
        return res.status(400).render('register');
      }

      await User.create({ username, password: password1 });

      req.flash('success', 'Account created successfully.');
      return res.redirect('/login');
    } catch (err) {
      req.flash('error', 'Register failed.');
      return res.status(400).render('register');
    }
  }
}

module.exports = new AuthController();
