const { model, Schema } = require('mongoose');

const MessageSchema = new Schema({
  author: {
    type: String,
    /* type: SchemaTypes.ObjectId,
    ref: 'User', */
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = model('Message', MessageSchema);
