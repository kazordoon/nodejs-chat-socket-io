require('dotenv-safe').config();
const cluster = require('cluster');
const cpusQuantity = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < cpusQuantity; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker online: ${worker.process.pid}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log('Exit', worker.process.pid, code, signal);
  });
} else {
  require('./database');

  const app = require('./app');

  const server = app.listen(app.get('PORT'), () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on ${app.get('HOST')}:${app.get('PORT')}`);
  });

  require('./config/socketIo')(server);
}
