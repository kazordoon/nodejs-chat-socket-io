const { model, Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line func-names
UserSchema.pre('save', async function (next) {
  const hashedPassword = await bcryptjs.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// eslint-disable-next-line func-names
UserSchema.methods.verifyPassword = async function (password) {
  return bcryptjs.compare(password, this.password);
};

module.exports = model('User', UserSchema);
