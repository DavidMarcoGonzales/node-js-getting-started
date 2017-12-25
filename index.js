'use strict';
const Inert = require('inert');
const path = require('path');

// Hapi
const Hapi = require('hapi');
const server = new Hapi.Server();



// Mongoose
const Mongoose = require('mongoose');
const cardModel = require('./Models/cardModel');
Mongoose.connect('mongodb://' + process.env.MLAB_USERNAME +':'+ process.env.MLAB_USERPASSWORD +'@ds161194.mlab.com:61194/' + process.env.MLAB_USERNAME, { useMongoClient: true });
Mongoose.connection.on('error', console.error.bind(console, 'connection error'));
Mongoose.connection.once('open', function callback() {console.log('Connection with database succeeded.');});


// Hapi
server.connection({
  port: process.env.PORT || 5000,
  routes: {cors: {origin: ['*']}  }
});

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
  path: "/cards/{cardId}",
  handler: (req, res) => {
    cardModel.findById(req.params.cardId, function (err, card) {
      if (err) {
          res('error')
      } else {
          res(card)
      }
  });
  }
});
server.start(err => {
  if (err) throw err;
  console.log(`Server listening on port ${server.info.uri}`);
});


