const { model, Schema, SchemaTypes } = require('mongoose');

const MessageSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = model('Message', MessageSchema);
