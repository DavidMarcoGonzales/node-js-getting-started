'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const path = require('path');
const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 5000,
  routes: {
    cors: {
      origin: ['*']
    }
  } });
server.register(Inert, () => {});
server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: {
      path: path.join(__dirname, 'build'),
      listing: false,
      index: true
    }
  }
})
server.route({
  method: 'GET',
  path: "/cards/{card}",
  handler: (req, res) => {
    res(encodeURIComponent(req.params.card))
  }
});
server.start(err => {
  if (err) throw err;
  console.log(`Server listening on port ${server.info.uri}`);
});

