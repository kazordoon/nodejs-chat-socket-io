/* eslint-disable no-console */
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(`Error connecting to MongoDB: ${err.message}`));
