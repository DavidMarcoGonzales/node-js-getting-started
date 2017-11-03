'use strict';

const Hapi = require('hapi');
const Path = require('path');
const server = new Hapi.Server();

server.connection({port: process.env.PORT || 5000});

server.register(
  {
    register: require('inert')
  }, (err) =>{
    if(err) {throw err;}

    server.route({
      method: 'GET',
      path: '/hello',
      handler: (request, reply) => {
        reply({message: 'Hey there, Dave'});
      }
    })
    server.route({
      method: 'GET',
      path: '/{path*}',
      handler: {
        directory: {
          path: Path.join(__dirname, 'build'),
          listing: false,
          index: true
        }
      }
    })




    server.start(err => {
      if(err) throw err;
      console.log(`Server listening on port ${server.info.uri}`);
    });
  }
)


