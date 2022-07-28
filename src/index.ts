import Server from './connection/server';

const server = new Server();
server.start(() => {
  console.log('Server started');
});
