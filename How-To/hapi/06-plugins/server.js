'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Geolocate = require('hapi-geo-locate');
const path = require('path');

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({
  port: process.env.port || 3001,
  routes: {
    cors: {
      origin: ['*']
    }
  }
});


server.register(Inert, () => {});

// To configure the plugin, we can pass
// an object which has an options key
server.register({
  register: Geolocate,
  options: {
    enabledByDefault: true
  }
}, err => {
  if (err) console.log(err);
});

// We're defining our route configuration in separate files
// and creating new routes with that configuration here
server.route(require('./api/instructors/routes/get_instructors'));
server.route(require('./api/instructors/routes/get_instructor'));
server.route(require('./api/instructors/routes/post_instructor'));
server.route(require('./api/images/routes/get_image'));

// Starting the server is as simple as calling
// server.start. We can throw an error if something
// goes wrong
server.start(err => {
  if (err) throw err;
  console.log(`Server listening at ${server.info.uri}`);
});
