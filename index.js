'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({port: 3001});

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => {
    reply({message: 'Hey there'});
  }
})

server.start(err => {
  if(err) throw err;
  console.log(`Server listening on port ${server.info.uri}`);
});

// var express = require('express');
// var app = express();

// app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));

// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index');
// });

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
