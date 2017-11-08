'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({ 
    port:  3001
 });

 server.route(require('./02-get_instructors'));
 server.route(require('./02-get_instructor'));
 server.route(require('./02-get_instructors_sorted'));

server.start(err => {
    if (err)
        throw err;
        console.log(`Server listening on port ${server.info.uri}`);
});