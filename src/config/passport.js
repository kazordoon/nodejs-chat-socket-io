const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/User');

const initializePassport = (passport) => {
  // eslint-disable-next-line consistent-return
  const verify = async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        const options = {
          message: "There's no user with that username.",
        };
        return done(null, false, options);
      }

      const incorrectPassword = !(await user.verifyPassword(password));

      if (incorrectPassword) {
        const options = { message: 'Incorrect password.' };
        return done(null, false, options);
      }

      return done(null, user);
    } catch (err) {
      const options = { message: 'Authentication failed.' };
      done(err, false, options);
    }
  };

  const strategy = new LocalStrategy(verify);

  passport.use(strategy);
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};

module.exports = initializePassport;
