'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  port: process.env.port || 3001,
  routes: {
    cors: {
      origin: ['*']
    }
  }
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => {
    reply({ message: 'Hey there' });  // returns json
    // reply('Hey there');               // returns text
  }
});

server.start(err => {
  if (err) throw err;
  console.log(`Server listening at ${server.info.uri}`);
});