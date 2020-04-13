require('dotenv-safe').config();
require('./database');
const app = require('./app');

const server = app.listen(app.get('PORT'), () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on ${app.get('HOST')}:${app.get('PORT')}`);
});

require('./config/socketIo')(server);
